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

type Post() =
    let mutable topicId : Guid = Guid.NewGuid()
    let mutable body : string = ""

    [<Key>] member val Id = Guid.NewGuid() with get, set
    [<Required>] member x.Body with get() = body and set v = body <- v
    [<Required>] member x.TopicId with get() = topicId and set v = topicId <- v


type PostContext() =
    inherit DbContext("MoreDakkaEntities")

    do Database.SetInitializer(new CreateDatabaseIfNotExists<PostContext>())
 
    [<DefaultValue()>]
    val mutable posts : IDbSet<Post>
 
    member x.Posts with get() = x.posts and set v = x.posts <- v


[<RoutePrefix("api/forum/post")>]
type PostController() =
    inherit ApiController()
    let postContext = new PostContext()

    [<Route("")>]
    member x.Get() =
        postContext.Posts

    [<Route("{id:guid}")>]
    [<HttpGet>]
    member x.Get(id) : IHttpActionResult =
        x.Ok(postContext.Posts.Where(fun t -> t.TopicId = id)) :> _

    [<Route("")>]
    member x.Post(post: Post) : IHttpActionResult =
        postContext.Posts.Add(post) |> ignore
        postContext.SaveChanges() |> ignore
        x.Ok(post) :> _

    [<Route("{id:guid}")>]
    [<HttpDelete>]
    member x.Delete(id: System.Guid) :IHttpActionResult =
        try
            let board = postContext.Posts.Find id
            postContext.Posts.Remove(board) |> ignore
            postContext.SaveChanges() |> ignore
            x.Ok() :> _
        with
        | :? ArgumentNullException -> x.NotFound() :> _
