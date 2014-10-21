namespace MoreDakka.Controllers

open System
open System.Threading.Tasks
open System.Web
open System.Web.Mvc
open System.Web.Routing
open Microsoft.AspNet.Identity
open Microsoft.AspNet.Identity.EntityFramework
open Microsoft.AspNet.Identity.Owin
open Microsoft.Owin.Security
open MoreDakka.Models
open Newtonsoft.Json
open System.Net
open MoreDakka.Data

type private AppUserManager = UserManager<ApplicationUser>
type private AppUserStore   = UserStore<ApplicationUser>

[<AttributeUsage(AttributeTargets.All, Inherited = true, AllowMultiple = true)>]
type AppAuthorizeAttribute() =
    inherit System.Web.Mvc.AuthorizeAttribute()
    override x.HandleUnauthorizedRequest(filterContext: System.Web.Mvc.AuthorizationContext) =
        let response = filterContext.HttpContext.Response

        if (filterContext.HttpContext.Request.IsAuthenticated) 
            then response.StatusCode <- int HttpStatusCode.Forbidden
            else response.StatusCode <- int HttpStatusCode.Unauthorized
        response.End()

[<CLIMutable>]
type LoginResult = {
    Result: bool
    ErrorMessage: string option
}

[<AppAuthorize>]
type AccountController() =
    inherit Controller()
    let userManager = new AppUserManager(new AppUserStore(new BoardContext()))

    new (manager:AppUserManager) as this = new AccountController() then
        this.UserManager <- manager

    member val UserManager = userManager with get, set

    member this.AuthenticationManager =
        this.HttpContext.GetOwinContext().Authentication

    // GET : /Account/Register
    [<AllowAnonymous>]
    member this.Register() = this.View()

    // POST : /Account/Register
    [<HttpPost>]
    [<AllowAnonymous>]
    [<ValidateAntiForgeryToken>]
    member this.Register(model:RegisterViewModel) : ActionResult =
        if this.ModelState.IsValid then
            let user = ApplicationUser(UserName = model.UserName, Email = model.Email)
            let result = this.UserManager.Create(user, model.Password)

            if result.Succeeded then
                this.SignIn(user, false)
                upcast this.RedirectToAction("Index", "Home")
            else
                this.AddErrors(result)
                upcast this.View(model)
        else
            upcast this.View(model)

    // GET : /Account/Login
    [<AllowAnonymous>]
    member this.Login() =
        this.View()

    // POST : /Account/Login
    [<HttpPost>]
    [<AllowAnonymous>]
    [<ValidateAntiForgeryToken>]
    member this.Login(model:LoginViewModel) : ActionResult =
        if this.ModelState.IsValid then
            match this.UserManager.Find(model.Username, model.Password) with
            | null ->
                this.ModelState.AddModelError("", "Invalid Username or Password.")
                upcast this.Json({ Result = false; ErrorMessage = Some("Invalid Username or Password.")})
            | user ->
                this.SignIn(user, model.RememberMe)
                upcast this.Json({ Result = true; ErrorMessage = None })
        else
            upcast this.Json({ Result = false; ErrorMessage = Some("Error processing request.")})

    [<AllowAnonymous>]
    member this.LoginRedirect(redirectUrl: string) : ActionResult =
        upcast this.Redirect("/#/account/login")

    // GET : /Account/Manage
    member this.Manage() =
        let userId = this.User.Identity.GetUserId()
        this.ViewData.["Email"] <- this.UserManager.GetEmail(userId)
        this.View()

    // POST : /Account/Manage
    [<HttpPost>]
    [<ValidateAntiForgeryToken>]
    member this.Manage(model:ManageUserViewModel) : ActionResult =
        if this.ModelState.IsValid then
            let userId = this.User.Identity.GetUserId()
            let result1 = this.UserManager.ChangePassword(
                            userId, model.OldPassword, model.NewPassword)
            let result2 = this.UserManager.SetEmail(userId, model.Email)

            if result1.Succeeded && result2.Succeeded then
                upcast this.RedirectToAction("Index", "Home")
            else
                this.AddErrors(result1)
                this.AddErrors(result2)
                upcast this.View(model)
        else
            upcast this.View(model)

    // POST : /Account/LogOut
    [<HttpPost>]
    [<ValidateAntiForgeryToken>]
    member this.LogOut() =
        this.AuthenticationManager.SignOut()
        this.RedirectToAction("Index", "Home")

    member private this.SignIn(user:ApplicationUser, isPersistent) =
        this.AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie)
        let identity = this.UserManager.CreateIdentity(user,
                            DefaultAuthenticationTypes.ApplicationCookie)
        let props = AuthenticationProperties(IsPersistent = isPersistent)
        this.AuthenticationManager.SignIn(props, identity)

    member private this.AddErrors(result:IdentityResult) =
        result.Errors |> Seq.iter (fun e -> this.ModelState.AddModelError("", e))


    override this.Dispose(disposing) =
        if disposing && (this.UserManager <> null) then
            this.UserManager.Dispose()
            this.UserManager <- null

        base.Dispose(disposing)