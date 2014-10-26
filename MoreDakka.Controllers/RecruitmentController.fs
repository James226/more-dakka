namespace MoreDakka.Controllers

open System
open System.Net
open System.Web.Mvc
open MoreDakka.Data
open Newtonsoft.Json
open System.Web
open System.Linq
open System.Data.Entity

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
type ApplicationSubmission = {
    characterName: string;
    realmName: string;
    mainspec: string;
    offspec: string;
}

type ApplicationResponse = {
    result: bool;
}

[<AppAuthorize>]
type RecruitmentController() =
    inherit System.Web.Mvc.Controller()

    let context = new BoardContext()

    [<HttpGet>]
    member x.Apply() =
        x.View()

    [<HttpPost>]
    member x.Apply(application: ApplicationSubmission) : ActionResult =
        let app = context.Applications.Include("User").FirstOrDefault(fun a -> a.User.UserName = HttpContext.Current.User.Identity.Name)

        if app <> null then
            app.Submission <- JsonConvert.SerializeObject(application)
            context.SaveChanges() |> ignore
        else
            let app = new Application(Submission = JsonConvert.SerializeObject(application))
            app.User <- context.Users.First(fun u -> u.UserName = HttpContext.Current.User.Identity.Name)
            context.Applications.Add(app) |> ignore
            context.SaveChanges() |> ignore

        upcast x.Json({ result = true })
        
    [<HttpGet>]
    member x.Index() =
        x.View()

    [<HttpGet>]
    member x.ViewApp() =
        x.View()

    [<HttpGet>]
    member x.Application() : ActionResult =
        let app = context.Applications.Include("User").First(fun a -> a.User.UserName = HttpContext.Current.User.Identity.Name)
        upcast x.Json(app, JsonRequestBehavior.AllowGet)

    [<HttpGet>]
    member x.Applications() : ActionResult =
        if HttpContext.Current.User.IsInRole("Admin")
            then upcast x.Json(context.Applications, JsonRequestBehavior.AllowGet)
            else upcast x.Json(context.Applications.Where(fun a -> a.Status = ApplicationStatus.Accepted), JsonRequestBehavior.AllowGet)

    [<HttpPut>]
    member x.SetStatus(id: System.Guid, status: ApplicationStatus) =
        let app = context.Applications.Find(id)
        app.Status <- status
        context.SaveChanges() |> ignore

        x.Json({ result = true })
