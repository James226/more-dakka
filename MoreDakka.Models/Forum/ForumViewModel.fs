namespace MoreDakka.Models.Forum

open System

type ForumViewModel = {
    Id: Guid
    Title: string
    TotalPosts: int
    LastPost: DateTime
}