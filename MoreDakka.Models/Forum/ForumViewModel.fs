namespace MoreDakka.Models.Forum

open System

type ForumViewModel = {
    Id: Guid
    Title: String
    TotalPosts: int
}