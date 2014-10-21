namespace MoreDakka.Controllers

open System
open System.Linq
open System.Web.Http
open System.Data.Entity

open MoreDakka.Data
open MoreDakka.Models.Forum
open System.Web

[<CLIMutable>]
type EditPostModel = {
    Body: string
}

[<RoutePrefix("api/forum/post")>]
[<AppAuthorize>]
type PostController() =
    inherit ApiController()
    let context = new BoardContext()

    [<Route("{id:guid}")>]
    [<HttpGet>]
    member x.Get(id) : IHttpActionResult =
        x.Ok(context.Topics.Include("Posts").Include("Posts.User").First(fun t -> t.Id = id).Posts.Select(fun p -> { Id = p.Id; Username = p.User.UserName; AuthorPosts = p.User.NumberOfPosts; Body = p.Body; PostedAt = p.PostedAt; Editable = (p.User.UserName = HttpContext.Current.User.Identity.Name) })) :> _

    [<Route("")>]
    member x.Post(post: Post) : IHttpActionResult =
        post.User <- context.Users.FirstOrDefault(fun u -> u.UserName = HttpContext.Current.User.Identity.Name)
        let topic = context.Topics.Include(fun t -> t.Posts).First(fun t -> t.Id = post.TopicId)
        topic.Posts.Add(post)
        topic.LastPost <- post
        topic.LastUpdate <- DateTime.UtcNow
        post.User.NumberOfPosts <- post.User.NumberOfPosts + 1
        context.SaveChanges() |> ignore
        x.Ok({ Id = post.Id; Username = post.User.UserName; AuthorPosts = post.User.NumberOfPosts; Body = post.Body; PostedAt = post.PostedAt; Editable = true }) :> _

    [<Route("{id:guid}")>]
    [<HttpPut>]
    member x.Put(id: Guid, [<FromBody>] editedPost: EditPostModel) : IHttpActionResult =
        let post = context.Posts.FirstOrDefault(fun p -> p.Id = id && p.User.UserName = HttpContext.Current.User.Identity.Name)
        match post with
        | null -> x.NotFound() :> _
        | _ -> post.Body <- editedPost.Body; context.SaveChanges() |> ignore; x.Ok() :> _
        

    [<Route("{id:guid}")>]
    [<HttpDelete>]
    [<Authorize>]
    member x.Delete(id: System.Guid) : IHttpActionResult =
        try
            let board = context.Posts.Find id
            context.Posts.Remove(board) |> ignore
            context.SaveChanges() |> ignore
            x.Ok() :> _
        with
        | :? ArgumentNullException -> x.NotFound() :> _
