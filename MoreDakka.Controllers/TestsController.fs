namespace MoreDakka.Controllers

open System.Web.Mvc

type TestsController() =
    inherit Controller()

    member x.Index() =
        x.View()
