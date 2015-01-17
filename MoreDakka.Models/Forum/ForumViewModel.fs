namespace MoreDakka.Models.Forum

open System
open MoreDakka.Data

type ForumViewModel = {
    Id: Guid
    Title: string
    TopicType: TopicType
    TotalPosts: int
    LastPost: DateTime
}