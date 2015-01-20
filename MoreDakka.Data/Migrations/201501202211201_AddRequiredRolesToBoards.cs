namespace MoreDakka.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRequiredRolesToBoards : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Boards", "RequiredRoles", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Boards", "RequiredRoles");
        }
    }
}
