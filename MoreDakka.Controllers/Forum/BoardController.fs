namespace MoreDakka.Controllers

open System
open System.Web.Http
open System.Linq
open System.Data.Entity

open MoreDakka.Data
open MoreDakka.Models.Forum

[<RoutePrefix("api/forum/board")>]
type BoardController() =
    inherit ApiController()
    let boardContext = new BoardContext()

    let CoerceBoardViewModel (id: Guid, name: string, totalTopics: int, totalPosts: int) : BoardViewModel =
        { Id = id; Name = name; TotalTopics = totalTopics; TotalPosts = totalPosts }

    [<Route("")>]
    member x.Get() : IHttpActionResult =
        let boards = query {
                for board in boardContext.Boards.Include(fun b -> b.Topics).Include("Topics.Posts") do
                select (board.Id, board.Name, board.Topics.Count, board.Topics.DefaultIfEmpty().Sum(fun t -> t.Posts.Count ) ) }
        x.Ok(Enumerable.Select(boards, CoerceBoardViewModel)) :> _

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
