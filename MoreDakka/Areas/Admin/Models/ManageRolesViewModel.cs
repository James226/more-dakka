using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity.EntityFramework;
using MoreDakka.Data;

namespace MoreDakka.Areas.Admin.Models
{
    public class ManageRolesViewModel
    {
        public ApplicationUser User { get; set; }
        public IEnumerable<IdentityRole> AssignedRoles { get; set; }
        public IEnumerable<IdentityRole> Roles { get; set; }

        public IEnumerable<IdentityRole> AvailableRoles
        {
            get { return Roles.Where(r => !AssignedRoles.Contains(r)); }
        } 
    }
}