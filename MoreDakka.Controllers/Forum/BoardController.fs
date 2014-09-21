namespace MoreDakka.Controllers

open System
open System.Web.Http

open MoreDakka.Data

[<RoutePrefix("api/forum/board")>]
type BoardController() =
    inherit ApiController()
    let boardContext = new BoardContext()

    [<Route("")>]
    member x.Get() =
        boardContext.Boards

    [<Route("")>]
    member x.Post(board: Board) : IHttpActionResult =
        boardContext.Boards.Add(board) |> ignore
        boardContext.SaveChanges() |> ignore
        x.Ok(board) :> _

    [<Route("{id:guid}")>]
    member x.Delete(id: System.Guid) : IHttpActionResult =
        try
            let board = boardContext.Boards.Find id
            boardContext.Boards.Remove(board) |> ignore
            boardContext.SaveChanges() |> ignore
            x.Ok() :> _
        with
        | :? ArgumentNullException -> x.NotFound() :> _
