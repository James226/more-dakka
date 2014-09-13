/// <reference path="MoreDakka.ts"/>

module MoreDakka {
    moreDakka.config($routeProvider => {
        $routeProvider
            .when('/', {
                templateUrl: 'Home/Home',
                controller: 'homeController'
            })
            .when('/forums', {
                templateUrl: 'Forums/Index',
                controller: 'forumsController'
            })
    });
}