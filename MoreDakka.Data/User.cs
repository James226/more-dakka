using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MoreDakka.Data
{
    public class ApplicationUser : IdentityUser
    {
        [Required, DefaultValue(0)]
        public int NumberOfPosts { get; set; }
    }
}
