using System.Data.Entity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using MoreDakka.Data;

namespace MoreDakka
{
    public class MyDbInitializer : DropCreateDatabaseAlways<BoardContext>
    {
        protected override void Seed(BoardContext context)
        {
            InitializeIdentityForEF(context);
            base.Seed(context);
        }

        private void InitializeIdentityForEF(BoardContext context)
        {
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
            var RoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            string name = "Admin";
            string password = "123456";

            //Create Role Admin if it does not exist
            if (!RoleManager.RoleExists(name))
            {
                RoleManager.Create(new IdentityRole(name));
            }

            var user = new ApplicationUser();
            user.UserName = name;
            var adminresult = UserManager.Create(user, password);

            //Add User Admin to Role Admin
            if (adminresult.Succeeded)
            {
                UserManager.AddToRole(user.Id, name);
            }
        }
    }
}