using System.ComponentModel.DataAnnotations;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MoreDakka.Areas.Admin.Models
{
    public class SelectRoleEditorViewModel
    {
        public SelectRoleEditorViewModel() { }

        // Update this to accept an argument of type ApplicationRole:
        public SelectRoleEditorViewModel(IdentityRole role)
        {
            RoleName = role.Name;
        }


        public bool Selected { get; set; }

        [Required]
        public string RoleName { get; set; }
    }
}