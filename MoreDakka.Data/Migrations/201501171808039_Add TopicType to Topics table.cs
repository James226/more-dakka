namespace MoreDakka.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddTopicTypetoTopicstable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Topics", "TopicType", c => c.Int(nullable: false));
            DropColumn("dbo.Topics", "PostType");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Topics", "PostType", c => c.Int(nullable: false));
            DropColumn("dbo.Topics", "TopicType");
        }
    }
}
