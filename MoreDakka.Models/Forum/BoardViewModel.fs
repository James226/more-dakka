namespace MoreDakka.Models.Forum

open System

[<CLIMutable>]
type BoardViewModel = {
    Id: Guid
    Name: String
    TotalTopics: int
    TotalPosts: int
}