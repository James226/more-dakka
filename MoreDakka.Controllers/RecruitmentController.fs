namespace MoreDakka.Controllers

open System
open System.Net

type RecruitmentController() =
    inherit System.Web.Mvc.Controller()

    member x.Apply() =
        x.View()
