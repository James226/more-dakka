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
open System.ComponentModel.DataAnnotations.Schema
open System.Collections.ObjectModel
open MoreDakka.Data

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
        x.Ok(context.Boards.Include(fun b -> b.Topics).First(fun b -> b.Id = id).Topics) :> _

    [<Route("")>]
    member x.Post(newTopic: NewTopic) : IHttpActionResult =
        let topic = Topic()
        //topic.BoardId <- newTopic.BoardId
        topic.Name <- newTopic.Title
        let board = context.Boards.First(fun b -> b.Id = newTopic.BoardId)
        board.Topics.Add(topic)
        context.SaveChanges() |> ignore

        let post = Post()
        post.TopicId <- topic.Id
        post.Body <- newTopic.Body
        topic.Posts.Add(post) |> ignore
        context.SaveChanges() |> ignore

        x.Ok(topic) :> _

    [<Route("{id:guid}")>]
    [<HttpDelete>]
    member x.Delete(id: System.Guid) :IHttpActionResult =
        try
            let board = context.Topics.Find id
            context.Topics.Remove(board) |> ignore
            context.SaveChanges() |> ignore
            x.Ok() :> _
        with
        | :? ArgumentNullException -> x.NotFound() :> _
