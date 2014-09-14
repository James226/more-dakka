namespace MoreDakka.Controllers

open System.Web.Mvc



type ForumsController() =
    inherit Controller()

    [<Authorize>]
    member x.Index() =
        x.View()
