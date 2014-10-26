using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;
using MoreDakka.Controllers;
using MoreDakka.Data;

namespace MoreDakka
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            var configuration = new Data.Migrations.Configuration();
            var migrator = new DbMigrator(configuration);
            migrator.Update();
        }

        protected void Application_EndRequest()
        {
            var context = new HttpContextWrapper(Context);

            if (FormsAuthentication.IsEnabled && context.Response.StatusCode == 302)
            {
                context.Response.Clear();
                context.Response.StatusCode = 401;
            }
        }

    }
}
