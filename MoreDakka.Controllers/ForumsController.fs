namespace MoreDakka.Controllers

open System
open System.Net

[<AppAuthorize>]
type ForumsController() =
    inherit System.Web.Mvc.Controller()

    member x.Index() =
        x.View()

    member x.Board() =
        x.View()

    member x.Topic() =
        x.View()
