/// <reference path="MoreDakka.ts"/>

module MoreDakka {
    moreDakka.config(($routeProvider, $httpProvider) => {
        $httpProvider.responseInterceptors.push('responseObserver');

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
            .when('/account/login', {
                templateUrl: 'Account/Login',
                controller: 'loginController'
            })
            .when('/account/register', {
                templateUrl: 'Account/Register',
                controller: 'registerController'
            })
            .when('/account/manage', {
                templateUrl: 'Account/Manage',
                controller: 'manageAccountController'
            });
    });

    moreDakka.factory('responseObserver',
        ($q, $window, $location) =>
        promise =>
        promise.then(successResponse =>
            successResponse, errorResponse => {

                switch (errorResponse.status) {
                case 401:
                    $location.path("/account/login");
                }

                return $q.reject(errorResponse);
            }));
}