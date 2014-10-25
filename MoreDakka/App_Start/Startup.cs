using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using MoreDakka.BattleNetAuth;
using MoreDakka.BattleNetAuth.Provider;
using MoreDakka.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Ninject.Activation;
using Owin;

namespace MoreDakka
{
    public class Startup
    {
        const string XmlSchemaString = "http://www.w3.org/2001/XMLSchema#string";

        public void Configuration(IAppBuilder app)
        {
            // Configure the db context, user manager and signin manager to use a single instance per request
            app.CreatePerOwinContext(() => new BoardContext());
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create);

            // Enable the application to use a cookie to store information for the signed in user
            // and to use a cookie to temporarily store information about a user logging in with a third party login provider
            // Configure the sign in cookie
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login"),
                Provider = new CookieAuthenticationProvider
                {
                    // Enables the application to validate the security stamp when the user logs in.
                    // This is a security feature which is used when you change a password or add an external login to your account.  
                    OnValidateIdentity = SecurityStampValidator.OnValidateIdentity<ApplicationUserManager, ApplicationUser>(
                        validateInterval: TimeSpan.FromMinutes(30),
                        regenerateIdentity: (manager, user) => user.GenerateUserIdentityAsync(manager))
                }
            });
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Enables the application to temporarily store user information when they are verifying the second factor in the two-factor authentication process.
            app.UseTwoFactorSignInCookie(DefaultAuthenticationTypes.TwoFactorCookie, TimeSpan.FromMinutes(5));

            // Enables the application to remember the second login verification factor such as phone or email.
            // Once you check this option, your second step of verification during the login process will be remembered on the device where you logged in from.
            // This is similar to the RememberMe option when you log in.
            app.UseTwoFactorRememberBrowserCookie(DefaultAuthenticationTypes.TwoFactorRememberBrowserCookie);

            app.UseBattleNetAuthentication(new BattleNetAuthenticationOptions
            {
                ClientId = ConfigurationManager.AppSettings["BattleNetClientId"],
                ClientSecret = ConfigurationManager.AppSettings["BattleNetSecret"],
                Provider = new BattleNetAuthenticationProvider()
                {
                    OnAuthenticated = async (context) =>
                    {
                        context.Identity.AddClaim(new System.Security.Claims.Claim("urn:BattleNet:access_token", context.AccessToken, XmlSchemaString, "BattleNet"));

                        var httpClient = new HttpClient();

                        // Get the BattleNet user
                        HttpRequestMessage userRequest = new HttpRequestMessage(HttpMethod.Get, "https://eu.api.battle.net/wow/user/characters?locale=en_GB&access_token=" + Uri.EscapeDataString(context.AccessToken));
                        userRequest.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                        HttpResponseMessage userResponse = await httpClient.SendAsync(userRequest);
                        userResponse.EnsureSuccessStatusCode();
                        var text = await userResponse.Content.ReadAsStringAsync();
                        JObject user = JObject.Parse(text);
                    }
                }
            });

        }
    }
}