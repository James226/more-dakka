namespace MoreDakka.Controllers

open System.Web.Mvc
open System.Web.Http

type GuildProgressController() =
    inherit ApiController()

    member x.Get() =
        x.Json(MoreDakka.Models.GuildProgression.GetProgression())
