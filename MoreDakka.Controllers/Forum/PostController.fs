namespace MoreDakka.Controllers

open System
open System.Linq
open System.Web.Http
open System.Data.Entity

open MoreDakka.Data
open MoreDakka.Models.Forum
open System.Web

[<RoutePrefix("api/forum/post")>]
[<AppAuthorize>]
type PostController() =
    inherit ApiController()
    let context = new BoardContext()

    [<Route("{id:guid}")>]
    [<HttpGet>]
    member x.Get(id) : IHttpActionResult =
        x.Ok(context.Topics.Include("Posts").Include("Posts.User").First(fun t -> t.Id = id).Posts.Select(fun p -> { Id = p.Id; Username = p.User.UserName; Body = p.Body; PostedAt = p.PostedAt })) :> _

    [<Route("")>]
    member x.Post(post: Post) : IHttpActionResult =
        post.User <- context.Users.FirstOrDefault(fun u -> u.UserName = HttpContext.Current.User.Identity.Name)
        let topic = context.Topics.Include(fun t -> t.Posts).First(fun t -> t.Id = post.TopicId)
        topic.Posts.Add(post)
        topic.LastPost <- post
        topic.LastUpdate <- DateTime.UtcNow
        context.SaveChanges() |> ignore
        x.Ok({ Id = post.Id; Username = post.User.UserName; Body = post.Body; PostedAt = post.PostedAt }) :> _

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
