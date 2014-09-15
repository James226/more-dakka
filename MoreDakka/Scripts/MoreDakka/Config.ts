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
                controller: 'forumController'
            })
            .when('/forums/:board_id', {
                templateUrl: 'Forums/Board',
                controller: 'topicController'
            })
            .when('/forums/:board_id/:topic_id', {
                templateUrl: 'Forums/Topic',
                controller: 'postController'
            })
    });
}