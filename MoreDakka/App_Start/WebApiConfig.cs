using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Http;

namespace MoreDakka
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                "DefaultApi", // Route name
                "api/{controller}/{id}", // URL with parameters
                new { controller = "{controller}", id = RouteParameter.Optional });

            config.Formatters.XmlFormatter.UseXmlSerializer = true;
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver =
                new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver();
        }
    }
}
