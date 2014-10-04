namespace MoreDakka.Models.Forum

open System

type TopicViewModel = {
    Id: Guid
    Username: String
    AuthorPosts: int
    Body: String
    PostedAt: DateTime
}