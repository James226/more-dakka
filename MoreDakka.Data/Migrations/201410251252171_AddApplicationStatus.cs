namespace MoreDakka.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddApplicationStatus : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Applications", "Status", c => c.Int(nullable: false, defaultValue: (int)ApplicationStatus.Undecided));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Applications", "Status");
        }
    }
}
