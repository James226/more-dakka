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
open MoreDakka.Data

[<RoutePrefix("api/forum/post")>]
type PostController() =
    inherit ApiController()
    let context = new BoardContext()

    [<Route("{id:guid}")>]
    [<HttpGet>]
    member x.Get(id) : IHttpActionResult =
        x.Ok(context.Topics.Include(fun t -> t.Posts).First(fun t -> t.Id = id).Posts) :> _

    [<Route("")>]
    member x.Post(post: Post) : IHttpActionResult =
        context.Topics.Include(fun t -> t.Posts).First(fun t -> t.Id = post.TopicId).Posts.Add(post) |> ignore
        context.SaveChanges() |> ignore
        x.Ok(post) :> _

    [<Route("{id:guid}")>]
    [<HttpDelete>]
    member x.Delete(id: System.Guid) :IHttpActionResult =
        try
            let board = context.Posts.Find id
            context.Posts.Remove(board) |> ignore
            context.SaveChanges() |> ignore
            x.Ok() :> _
        with
        | :? ArgumentNullException -> x.NotFound() :> _
