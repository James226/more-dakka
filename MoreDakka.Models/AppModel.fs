namespace MoreDakka.Models

open System
open System.Data.Entity
open System.ComponentModel.DataAnnotations
open Microsoft.AspNet.Identity
open Microsoft.AspNet.Identity.EntityFramework

[<AllowNullLiteral>]
type ApplicationUser() =
    inherit IdentityUser()


type IdentityContext() =
    inherit IdentityDbContext<ApplicationUser>("MoreDakkaEntities")

    override this.OnModelCreating(builder:DbModelBuilder) =
        base.OnModelCreating(builder)
        builder.Entity<IdentityUser>().ToTable("Users") |> ignore
        builder.Entity<ApplicationUser>().ToTable("Users") |> ignore