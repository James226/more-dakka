using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using MoreDakka.Areas.Admin.Models;
using MoreDakka.Data;

namespace MoreDakka.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UserController : Controller
    {
        private readonly BoardContext _context = new BoardContext();

        private ApplicationUserManager _userManager;
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public ActionResult Index()
        {
            return View(_context.Users.ToArray());
        }

        public ActionResult Details(string id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
                return HttpNotFound();
            return View(user);
        }

        public ActionResult Edit(string id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
                return HttpNotFound();
            return View(new EditUserViewModel{ Id = user.Id, UserName = user.UserName, Email = user.Email, EmailConfirmed = user.EmailConfirmed, NewPassword = string.Empty });
        }

        [HttpPost]
        public async Task<ActionResult> Edit(string id, FormCollection collection)
        {
            try
            {
                var user = _context.Users.Find(id);
                if (TryUpdateModel(user, collection))
                {
                    _context.SaveChanges();

                    if (!string.IsNullOrEmpty(collection["NewPassword"]))
                    {
                        await UserManager.RemovePasswordAsync(id);
                        await UserManager.AddPasswordAsync(id, collection["NewPassword"]);
                    }
                    return RedirectToAction("Index");
                }
                return View();
            }
            catch
            {
                ModelState.AddModelError("", "Unable to save changes, user may have been modified by someone else.");
                return View();
            }
        }

        public ActionResult Delete(string id)
        {
            var userManager = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            var user = userManager.FindById(id);
            userManager.Delete(user);
            return RedirectToAction("Index");
        }
    }
}
