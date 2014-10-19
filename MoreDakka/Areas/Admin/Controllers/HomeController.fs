namespace MoreDakka.Areas.Admin.Controllers

open System.Web.Mvc
open MoreDakka.Data

[<Authorize(Roles="Administrator")>]
type HomeController() =
    inherit Controller()

    let context = BoardContext()

    member x.Index() =
        let roles = context.Roles;
        x.View(roles)

    [<HttpGet>]
    member x.Create() =
        x.View()

    [<HttpPost>]
    member x.Create(collection: FormCollection) : ActionResult =
        try
            context.Roles.Add( Microsoft.AspNet.Identity.EntityFramework.IdentityRole(Name = collection.["RoleName"])) |> ignore
            context.SaveChanges() |> ignore
            upcast x.RedirectToAction("Index");
        with
        | _ -> upcast x.View()
