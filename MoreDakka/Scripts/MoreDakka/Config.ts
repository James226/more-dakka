/// <reference path="MoreDakka.ts"/>

module MoreDakka {
    moreDakka.config($routeProvider => {
        $routeProvider
            .when('/', {
                templateUrl: 'Home/Home',
                controller: 'homeController'
            })
            .when('/test', {
                templateUrl: 'api/values',
                controller: 'testController'
            })
    });
}