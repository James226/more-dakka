namespace MoreDakka.Controllers

open System.Web.Http
open MoreDakka.Data
open System.Web

[<CLIMutable>]
type PageModel = {
    Editable: bool
    Page: Page
}

[<Authorize(Roles="Officer")>]
type PageController() =
    inherit ApiController()

    let context = new BoardContext()

    [<AllowAnonymous>]
    member x.Get(Id: string) =
        x.Json({ Editable = HttpContext.Current.User.IsInRole("Officer"); Page = context.Pages.Find(Id) })

    member x.Post(page: Page) =
        context.Pages.Add(page) |> ignore
        context.SaveChanges() |> ignore
        x.Ok()

    member x.Put(page: Page) =
        let existingPage = context.Pages.Find(page.Name)
        existingPage.Body <- page.Body
        context.SaveChanges() |> ignore
        x.Ok()
