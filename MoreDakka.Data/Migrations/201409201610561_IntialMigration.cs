namespace MoreDakka.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class IntialMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Boards",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Topics",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        BoardId = c.Guid(nullable: false),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Boards", t => t.BoardId, cascadeDelete: true)
                .Index(t => t.BoardId);
            
            CreateTable(
                "dbo.Posts",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        TopicId = c.Guid(nullable: false),
                        Body = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Topics", t => t.TopicId, cascadeDelete: true)
                .Index(t => t.TopicId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Topics", "BoardId", "dbo.Boards");
            DropForeignKey("dbo.Posts", "TopicId", "dbo.Topics");
            DropIndex("dbo.Posts", new[] { "TopicId" });
            DropIndex("dbo.Topics", new[] { "BoardId" });
            DropTable("dbo.Posts");
            DropTable("dbo.Topics");
            DropTable("dbo.Boards");
        }
    }
}
