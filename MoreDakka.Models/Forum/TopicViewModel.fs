namespace MoreDakka.Models.Forum

open System

type TopicViewModel = {
    Id: Guid
    Username: String
    Body: String
    PostedAt: DateTime
}