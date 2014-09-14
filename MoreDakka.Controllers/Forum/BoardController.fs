namespace MoreDakka.Controllers
open System
open System.Collections.Generic
open System.Linq
open System.Net.Http
open System.Web.Http

open System.Data.Entity; 
open System.Collections.Generic; 
open System.ComponentModel.DataAnnotations; 
open System.Data.Entity.Infrastructure; 

type Board() =
    let mutable name : string = ""

    [<Key>] member val Id = Guid.NewGuid() with get, set
    [<Required>] member x.Name with get() = name and set v = name <- v

type BoardContext() =
    inherit DbContext("MoreDakkaEntities")

    do Database.SetInitializer(new CreateDatabaseIfNotExists<BoardContext>())
 
    [<DefaultValue()>]
    val mutable boards : IDbSet<Board>
 
    member x.Boards with get() = x.boards and set v = x.boards <- v


[<RoutePrefix("api/forum/board")>]
type BoardController() =
    inherit ApiController()
    let values = [|"value1";"value2"|]
    let boardContext = new BoardContext()

    [<Route("")>]
    member x.Get() =
        boardContext.Boards

    [<Route("{id:int}")>]
    member x.Get(id) : IHttpActionResult =
        if id > values.Length - 1 then
            x.BadRequest() :> _
        else x.Ok(values.[id]) :> _

    [<Route("")>]
    member x.Post(board: Board) : IHttpActionResult =
        boardContext.Boards.Add(board) |> ignore
        boardContext.SaveChanges() |> ignore
        x.Ok(board) :> _

    [<Route("{id:guid}")>]
    member x.Delete(id: System.Guid) :IHttpActionResult =
        try
            let board = boardContext.Boards.Find id
            boardContext.Boards.Remove(board) |> ignore
            boardContext.SaveChanges() |> ignore
            x.Ok() :> _
        with
        | :? ArgumentNullException -> x.NotFound() :> _
