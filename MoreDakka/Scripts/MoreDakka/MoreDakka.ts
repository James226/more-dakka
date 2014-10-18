/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/bootstrap/bootstrap.d.ts"/>

module MoreDakka {
    export var moreDakka: ng.IModule;

    moreDakka = angular.module('moreDakka', ['ngRoute', 'ngAnimate', 'ngSanitize'])
        .run(($rootScope, $route, $templateCache, $http) => {
            //var url;
            //for (var i in $route.routes) {
            //    if (url = $route.routes[i].templateUrl) {
            //        $http.get(url, { cache: $templateCache });
            //    }
            //}
        });
}