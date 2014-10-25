namespace MoreDakka.Controllers

open System.Web.Mvc
open System.Web.Http
open MoreDakka.Data

type GuildProgressController() =
    inherit ApiController()

    member x.Get() =
        x.Json(MoreDakka.Models.GuildProgression.GetProgression())
