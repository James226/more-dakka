/// <reference path="MoreDakka.ts"/>
var MoreDakka;
(function (MoreDakka) {
    MoreDakka.moreDakka.config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'Home/Home',
            controller: 'homeController'
        }).when('/forums', {
            templateUrl: 'Forums/Index',
            controller: 'forumController'
        }).when('/forums/:board_id', {
            templateUrl: 'Forums/Board',
            controller: 'topicController'
        });
    });
})(MoreDakka || (MoreDakka = {}));
