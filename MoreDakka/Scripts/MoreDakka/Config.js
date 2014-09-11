/// <reference path="MoreDakka.ts"/>
var MoreDakka;
(function (MoreDakka) {
    MoreDakka.moreDakka.config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'Home/Home',
            controller: 'homeController'
        }).when('/test', {
            templateUrl: 'api/values',
            controller: 'testController'
        });
    });
})(MoreDakka || (MoreDakka = {}));
//# sourceMappingURL=Config.js.map
