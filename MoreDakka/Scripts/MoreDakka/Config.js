/// <reference path="MoreDakka.ts"/>
var MoreDakka;
(function (MoreDakka) {
    MoreDakka.moreDakka.config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'Home/Home',
            controller: 'homeController'
        }).when('/forums', {
            templateUrl: 'Forums/Index',
            controller: 'forumsController'
        });
    });
})(MoreDakka || (MoreDakka = {}));
