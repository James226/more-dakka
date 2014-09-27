namespace MoreDakka.Controllers

open System
open System.Net

            
[<AttributeUsage(AttributeTargets.All, Inherited = true, AllowMultiple = true)>]
type AuthorizeAttribute() =
    inherit System.Web.Mvc.AuthorizeAttribute()
    override x.HandleUnauthorizedRequest(filterContext: System.Web.Mvc.AuthorizationContext) =
        let response = filterContext.HttpContext.Response

        if (filterContext.HttpContext.Request.IsAuthenticated) 
            then response.StatusCode <- int HttpStatusCode.Forbidden
            else response.StatusCode <- int HttpStatusCode.Unauthorized
        response.End()


type ForumsController() =
    inherit System.Web.Mvc.Controller()

    [<Authorize>]
    member x.Index() =
        x.View()

    [<Authorize>]
    member x.Board() =
        x.View()

    [<Authorize>]
    member x.Topic() =
        x.View()
