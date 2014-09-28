namespace MoreDakka.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddPostedAtTime : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Posts", "PostedAt", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Posts", "PostedAt");
        }
    }
}
