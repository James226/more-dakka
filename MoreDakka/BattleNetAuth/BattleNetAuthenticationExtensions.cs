using System;
using Owin;

namespace MoreDakka.BattleNetAuth
{
    public static class BattleNetAuthenticationExtensions
    {
        public static IAppBuilder UseBattleNetAuthentication(this IAppBuilder app, BattleNetAuthenticationOptions options)
        {
            if (app == null)
                throw new ArgumentNullException("app");
            if (options == null)
                throw new ArgumentNullException("options");

            app.Use(typeof(BattleNetAuthenticationMiddleware), app, options);

            return app;
        }
    }
}