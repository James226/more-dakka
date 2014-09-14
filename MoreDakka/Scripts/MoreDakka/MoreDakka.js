/// <reference path="../typings/angularjs/angular.d.ts"/>
var MoreDakka;
(function (MoreDakka) {
    MoreDakka.moreDakka;

    MoreDakka.moreDakka = angular.module('moreDakka', ['ngRoute', 'ngAnimate']).run(function ($rootScope, $route, $templateCache, $http) {
        var url;
        for (var i in $route.routes) {
            if (url = $route.routes[i].templateUrl) {
                $http.get(url, { cache: $templateCache });
            }
        }
    });
})(MoreDakka || (MoreDakka = {}));
