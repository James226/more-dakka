using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using MoreDakka.Data;

namespace MoreDakka.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UserController : Controller
    {
        private readonly BoardContext _context = new BoardContext();

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
            return View(user);
        }

        [HttpPost]
        public ActionResult Edit(string id, FormCollection collection)
        {
            try
            {
                var user = _context.Users.Find(id);
                if (TryUpdateModel(user, collection))
                {
                    _context.SaveChanges();
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
