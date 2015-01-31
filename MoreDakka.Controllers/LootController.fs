namespace MoreDakka.Controllers

open System
open System.Net

type LootController() =
    inherit System.Web.Mvc.Controller()

    member x.Index() =
        x.View()
