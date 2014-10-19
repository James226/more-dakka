namespace MoreDakka.Areas.Admin

open System.Web.Mvc

type Route = {
    controller: string
    action : string
    id : UrlParameter }

type AdminAreaRegistration() =
    inherit AreaRegistration()
    
    override x.AreaName with get(): string = "Admin"

    override x.RegisterArea(context: AreaRegistrationContext) =
        context.MapRoute(
            "Admin_default",
            "Admin/{controller}/{action}/{id}",
            { controller = "Home"; action = "Index"; id = UrlParameter.Optional }
        ) |> ignore