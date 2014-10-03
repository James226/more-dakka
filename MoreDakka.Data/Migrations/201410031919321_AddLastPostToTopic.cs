namespace MoreDakka.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddLastPostToTopic : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Topics", "LastUpdate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Topics", "LastPost_Id", c => c.Guid());
            CreateIndex("dbo.Topics", "LastPost_Id");
            AddForeignKey("dbo.Topics", "LastPost_Id", "dbo.Posts", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Topics", "LastPost_Id", "dbo.Posts");
            DropIndex("dbo.Topics", new[] { "LastPost_Id" });
            DropColumn("dbo.Topics", "LastPost_Id");
            DropColumn("dbo.Topics", "LastUpdate");
        }
    }
}
