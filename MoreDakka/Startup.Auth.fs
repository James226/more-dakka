namespace MoreDakka.Identity

open Owin
open Microsoft.Owin
open Microsoft.Owin.Security.Cookies
open Microsoft.AspNet.Identity
open Microsoft.Owin.Security.OAuth;
open Microsoft.Owin.Security.Google;

type Startup() =
//    let OAuthOptions = OAuthAuthorizationServerOptions()
//    let InitOAuth() =
//        OAuthOptions.TokenEndpointPath <- PathString("/Token")
//        OAuthOptions.AuthorizeEndpointPath <- PathString("/Account/Authorize")
//        OAuthOptions.Provider <- OAuthAuthorizationServerProvider()
//        OAuthOptions.AccessTokenExpireTimeSpan <- System.TimeSpan.FromDays(14.0)
//        OAuthOptions.AllowInsecureHttp <- true

    let configureAuth (app:IAppBuilder) : unit =
        CookieAuthenticationOptions(
            AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
            LoginPath = PathString("/Account/Login")
        )
        |> app.UseCookieAuthentication |> ignore

        app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie)

//        app.UseOAuthBearerTokens(OAuthOptions);
//
//        let googleOAuth = GoogleOAuth2AuthenticationOptions()
//        googleOAuth.ClientId <- ""
//        googleOAuth.ClientSecret <- ""

    member this.Configuration(app:IAppBuilder) = configureAuth app


[<assembly:Microsoft.Owin.OwinStartup(typeof<Startup>)>]
do ()