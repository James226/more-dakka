using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using MoreDakka.Areas.Admin.Models;
using MoreDakka.Data;

namespace MoreDakka.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class RoleController : Controller
    {
        private readonly BoardContext context = new BoardContext();

        // GET: Admin/Role
        public ActionResult Index()
        {
            var manager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            return View(manager.Roles.ToArray());
        }

        public ActionResult Manage(string id)
        {
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            var model = new ManageRolesViewModel
            {
                User = context.Users.Find(id),
                Roles = roleManager.Roles.ToArray(),
                AssignedRoles = roleManager.Roles.Where(r => r.Users.Any(u => u.UserId == id)).ToArray()
            };
            return View(model);
        }

        // GET: Admin/Role/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Admin/Role/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/Role/Create
        [System.Web.Mvc.HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Admin/Role/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Admin/Role/Edit/5
        [System.Web.Mvc.HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Admin/Role/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Admin/Role/Delete/5
        [System.Web.Mvc.HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        public async Task<ActionResult> UnassignRole(string id, FormCollection collection)
        {
            var userManager = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            await userManager.RemoveFromRoleAsync(id, collection["role"]);

            return RedirectToAction("Manage", routeValues: new {Id = id});
        }

        public async Task<ActionResult> AssignRole(string id, FormCollection collection)
        {
            var userManager = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            await userManager.AddToRoleAsync(id, collection["role"]);

            return RedirectToAction("Manage", routeValues: new {Id = id});
        }
    }
}
