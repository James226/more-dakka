namespace MoreDakka.Controllers

open System.Web.Mvc



type ForumsController() =
    inherit Controller()

    member x.Index() =
        x.View()
