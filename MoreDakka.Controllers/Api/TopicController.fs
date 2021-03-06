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

[<CLIMutable>]
type TopicPatch = {
    topicType: TopicType
}

[<RoutePrefix("api/forum/topic")>]
[<Authorize>]
type TopicController() =
    inherit ApiController()
    let context = new BoardContext()

    let CoerceTopics(id, name, topicType, totalPosts, lastPost: Post) =
        { Id = id; Title = name; TopicType = topicType; TotalPosts = totalPosts; LastPost = lastPost.PostedAt }

    [<Route("{id:guid}")>]
    [<HttpGet>]
    member x.Get(id) : IHttpActionResult =
        let topics = query {
                for topic in context.Topics.Include("Posts").Include("Posts.User") do
                where (topic.BoardId = id)
                sortByDescending topic.TopicType
                thenByDescending topic.LastPost.PostedAt
                select (topic.Id, topic.Name, topic.TopicType, topic.Posts.Count, topic.Posts.OrderByDescending(fun p -> p.PostedAt).FirstOrDefault())
            }
            
        x.Ok(Enumerable.Select(topics, CoerceTopics)) :> _

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
        topic.LastPost <- post

        user.NumberOfPosts <- user.NumberOfPosts + 1

        context.SaveChanges() |> ignore

        x.Ok({ Id = topic.Id; Title = topic.Name; TopicType = topic.TopicType; TotalPosts = topic.Posts.Count; LastPost = post.PostedAt }) :> _

    [<Route("{id:guid}")>]
    [<HttpPatch>]
    member x.Patch(id: System.Guid, data: TopicPatch) : IHttpActionResult =
        try
            let topic = context.Topics.Find id
            if data.topicType <> TopicType.None then
                topic.TopicType <- data.topicType
            context.SaveChanges() |> ignore
            x.Ok() :> _
        with
        | :? ArgumentNullException -> x.NotFound() :> _

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
