namespace MoreDakka.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUserReferenceToPosts : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Topics", "User_Id", c => c.String(maxLength: 128));
            AddColumn("dbo.Posts", "User_Id", c => c.String(maxLength: 128));
            CreateIndex("dbo.Topics", "User_Id");
            CreateIndex("dbo.Posts", "User_Id");
            AddForeignKey("dbo.Posts", "User_Id", "dbo.Users", "Id");
            AddForeignKey("dbo.Topics", "User_Id", "dbo.Users", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Topics", "User_Id", "dbo.Users");
            DropForeignKey("dbo.Posts", "User_Id", "dbo.Users");
            DropIndex("dbo.Posts", new[] { "User_Id" });
            DropIndex("dbo.Topics", new[] { "User_Id" });
            DropColumn("dbo.Posts", "User_Id");
            DropColumn("dbo.Topics", "User_Id");
        }
    }
}
