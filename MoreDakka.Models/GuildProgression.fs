module MoreDakka.Models.GuildProgression

open FSharp.Data
open FSharp.Data.JsonExtensions

type BossProgression = {
    Name: string
    HeroicKills: int
    MythicKills: int
}

type RaidProgression = BossProgression seq

let GetProgression() : RaidProgression =
    let GetCurrentRaid(characterProgression : JsonValue) =
        let raids = characterProgression?progression?raids.AsArray()
        Array.find (fun r -> r?name.AsString() = "Blackrock Foundry") raids

    let GetCurrentProgress(raidProgression: JsonValue) =
        seq { for raid in raidProgression?bosses.AsArray() do
              yield { Name = raid?name.AsString(); HeroicKills = raid?heroicKills.AsInteger(); MythicKills = raid?mythicKills.AsInteger() }}

    let GetCharacterProgression(character) = 
        async {
            try
                let url = sprintf "http://eu.battle.net/api/wow/character/Doomhammer/%s?fields=progression" character
                let! request = Http.AsyncRequestString url
                return JsonValue.Parse request
                    |> GetCurrentRaid
                    |> GetCurrentProgress
            with
            | ex -> return Seq.empty
        }

    let GetActiveCharacters() =
        let GetMembers(guildInfo) = 
            guildInfo?members.AsArray()

        async {
            //let! request = Http.AsyncRequestString "http://eu.battle.net/api/wow/guild/Doomhammer/More%20Dakka?fields=members"
            let request = "{\"members\":[
                {\"character\":{\"name\": \"Miyo\", \"level\": \"90\"}, \"rank\": \"1\"}
                ]}"
            return JsonValue.Parse request
                |> GetMembers
                |> Seq.filter (fun m -> m?character?level.AsInteger() = 90)
                |> Seq.filter (fun m -> m?rank.AsInteger() <= 5)
                |> Seq.map (fun m -> m?character?name.AsString())
        }

    let CondenseResults results : RaidProgression = 
        let GetBossNames() =
            seq { for raidProgress in results do
                    for bossProgress in raidProgress do
                        yield bossProgress.Name }

        let GetBossProgress(name) =
            seq { for raidProgress in results do
                    for bossProgress in raidProgress do
                        if bossProgress.Name = name then
                            yield bossProgress }

        let GetMaxMythicKills(bossProgress) =
            bossProgress
            |> Seq.sumBy (fun b -> match b.MythicKills with 0 -> 0 | _ -> 1)

        let GetMaxHeroicKills(bossProgress) =
            bossProgress
            |> Seq.sumBy (fun b -> match b.HeroicKills with 0 -> 0 | _ -> 1)
            
        GetBossNames()
        |> Seq.distinct
        |> Seq.map GetBossProgress
        |> Seq.map (fun b -> { Name = (Seq.head b).Name; MythicKills = GetMaxMythicKills b; HeroicKills = GetMaxHeroicKills b })

    let characters = 
        GetActiveCharacters()
        |> Async.RunSynchronously

    characters
    |> Seq.map GetCharacterProgression
    |> Async.Parallel
    |> Async.RunSynchronously
    |> CondenseResults