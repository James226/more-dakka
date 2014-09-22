namespace MoreDakka.Controllers

open System
open System.Collections.Generic
open System.Linq
open System.Web.Http
open System.Data.Entity
open System.ComponentModel.DataAnnotations

open MoreDakka.Data
open MoreDakka.Models.Forum
open System.Web

type NewTopic() =
    let mutable title : string = ""
    let mutable body : string = ""
    let mutable boardId : Guid = Guid.NewGuid()

    [<Required>] member x.Title with get() = title and set v = title <- v
    [<Required>] member x.Body with get() = body and set v = body <- v
    [<Required>] member x.BoardId with get() = boardId and set v = boardId <- v

[<RoutePrefix("api/forum/topic")>]
type TopicController() =
    inherit ApiController()
    let context = new BoardContext()

    [<Route("{id:guid}")>]
    [<HttpGet>]
    member x.Get(id) : IHttpActionResult =
        x.Ok(context.Boards
            .Include(fun b -> b.Topics)
            .Include("Topics.Posts")
            .First(fun b -> b.Id = id).Topics.Select(fun t -> { Id = t.Id; Title = t.Name; TotalPosts = t.Posts.Count })) :> _

    [<Route("")>]
    member x.Post(newTopic: NewTopic) : IHttpActionResult =
        let user = context.Users.First(fun u -> u.UserName = HttpContext.Current.User.Identity.Name)
        let topic = Topic()
        topic.Name <- newTopic.Title
        topic.User <- user
        let board = context.Boards.First(fun b -> b.Id = newTopic.BoardId)
        board.Topics <- List<Topic>()
        board.Topics.Add(topic)
        context.SaveChanges() |> ignore

        let post = Post()
        post.TopicId <- topic.Id
        post.Body <- newTopic.Body
        post.User <- user

        topic.Posts <- List<Post>()
        topic.Posts.Add(post)
        context.SaveChanges() |> ignore

        x.Ok(topic) :> _

    [<Route("{id:guid}")>]
    [<HttpDelete>]
    member x.Delete(id: System.Guid) : IHttpActionResult =
        try
            let board = context.Topics.Find id
            context.Topics.Remove(board) |> ignore
            context.SaveChanges() |> ignore
            x.Ok() :> _
        with
        | :? ArgumentNullException -> x.NotFound() :> _
