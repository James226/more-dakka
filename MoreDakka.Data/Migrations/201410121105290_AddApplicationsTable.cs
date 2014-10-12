namespace MoreDakka.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddApplicationsTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Applications",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Submission = c.String(nullable: false),
                        SubmittedAt = c.DateTime(nullable: false),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.User_Id)
                .Index(t => t.User_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Applications", "User_Id", "dbo.Users");
            DropIndex("dbo.Applications", new[] { "User_Id" });
            DropTable("dbo.Applications");
        }
    }
}
