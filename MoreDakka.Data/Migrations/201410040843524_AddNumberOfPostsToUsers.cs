namespace MoreDakka.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddNumberOfPostsToUsers : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "NumberOfPosts", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "NumberOfPosts");
        }
    }
}
