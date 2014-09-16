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

type Topic() =
    let mutable name : string = ""
    let mutable boardId : Guid = Guid.NewGuid()

    [<Key>] member val Id = Guid.NewGuid() with get, set
    [<Required>] member x.Name with get() = name and set v = name <- v
    [<Required>] member x.BoardId with get() = boardId and set v = boardId <- v

type NewTopic() =
    let mutable title : string = ""
    let mutable body : string = ""
    let mutable boardId : Guid = Guid.NewGuid()

    [<Key>] member val Id = Guid.NewGuid() with get, set
    [<Required>] member x.Title with get() = title and set v = title <- v
    [<Required>] member x.Body with get() = body and set v = body <- v
    [<Required>] member x.BoardId with get() = boardId and set v = boardId <- v


type TopicContext() =
    inherit DbContext("MoreDakkaEntities")

    do Database.SetInitializer(new CreateDatabaseIfNotExists<TopicContext>())
 
    [<DefaultValue()>]
    val mutable topics : IDbSet<Topic>
 
    member x.Topics with get() = x.topics and set v = x.topics <- v


[<RoutePrefix("api/forum/topic")>]
type TopicController() =
    inherit ApiController()
    let topicContext = new TopicContext()
    let postContext = new PostContext()

    [<Route("")>]
    member x.Get() =
        topicContext.Topics

    [<Route("{id:guid}")>]
    [<HttpGet>]
    member x.Get(id) : IHttpActionResult =
        x.Ok(topicContext.Topics.Where(fun t -> t.BoardId = id)) :> _

    [<Route("")>]
    member x.Post(newTopic: NewTopic) : IHttpActionResult =
        let topic = Topic()
        topic.BoardId <- newTopic.BoardId
        topic.Name <- newTopic.Title
        topicContext.Topics.Add(topic) |> ignore
        topicContext.SaveChanges() |> ignore

        let post = Post()
        post.TopicId <- topic.Id
        post.Body <- newTopic.Body
        postContext.Posts.Add(post) |> ignore
        postContext.SaveChanges() |> ignore

        x.Ok(topic) :> _

    [<Route("{id:guid}")>]
    [<HttpDelete>]
    member x.Delete(id: System.Guid) :IHttpActionResult =
        try
            let board = topicContext.Topics.Find id
            topicContext.Topics.Remove(board) |> ignore
            topicContext.SaveChanges() |> ignore
            x.Ok() :> _
        with
        | :? ArgumentNullException -> x.NotFound() :> _
