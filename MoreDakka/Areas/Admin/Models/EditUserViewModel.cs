using System.ComponentModel;

namespace MoreDakka.Areas.Admin.Models
{
    public class EditUserViewModel
    {
        public string Id { get; set; }
        [DisplayName("Username")]
        public string UserName { get; set; }
        [DisplayName("Email Address")]
        public string Email { get; set; }
        [DisplayName("Email Confirmed")]
        public bool EmailConfirmed { get; set; }
        [DisplayName("New Password")]
        public string NewPassword { get; set; }
    }
}