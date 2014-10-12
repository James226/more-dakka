namespace MoreDakka.Controllers

open System
open System.Net
open System.Web.Mvc
open MoreDakka.Data
open Newtonsoft.Json
open System.Web

[<CLIMutable>]
type ApplicationSubmission = {
    characterName: string;
    realmName: string;
}

type ApplicationResponse = {
    result: bool;
}

type RecruitmentController() =
    inherit System.Web.Mvc.Controller()

    let context = new BoardContext()

    [<HttpGet>]
    member x.Apply() =
        x.View()

    [<HttpPost>]
    member x.Apply(application: ApplicationSubmission) : ActionResult =
        context.Applications.Add(new Application(Submission = JsonConvert.SerializeObject(application))) |> ignore
        context.SaveChanges() |> ignore
        upcast x.Json({ result = false })
        
    [<HttpGet>]
    member x.List() =
        x.View()

    [<HttpGet>]
    member x.Applications() : ActionResult =
        upcast x.Json(context.Applications, JsonRequestBehavior.AllowGet)