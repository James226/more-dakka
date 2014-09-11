namespace MoreDakka.Controllers
open System
open System.Collections.Generic
open System.Linq
open System.Net.Http
open System.Web.Http

[<RoutePrefix("api/values")>]
type ValuesController() =
    inherit ApiController()
    let values = [|"value1";"value2"|]

    [<Route("")>]
    member x.Get() = values

    [<Route("{id:int}")>]
    member x.Get(id) : IHttpActionResult =
        if id > values.Length - 1 then
            x.BadRequest() :> _
        else x.Ok(values.[id]) :> _