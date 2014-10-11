﻿/// <reference path="MoreDakka.ts"/>
var MoreDakka;
(function (MoreDakka) {
    MoreDakka.moreDakka.config(function ($routeProvider, $httpProvider) {
        $httpProvider.responseInterceptors.push('responseObserver');

        $routeProvider.when('/', {
            templateUrl: 'Home/Home',
            controller: 'homeController'
        }).when('/forums', {
            templateUrl: 'Forums/Index',
            controller: 'forumController'
        }).when('/forums/:board_id', {
            templateUrl: 'Forums/Board',
            controller: 'topicController'
        }).when('/forums/:board_id/:topic_id', {
            templateUrl: 'Forums/Topic',
            controller: 'postController'
        }).when('/account/login', {
            templateUrl: 'Account/Login',
            controller: 'loginController'
        }).when('/account/register', {
            templateUrl: 'Account/Register',
            controller: 'registerController'
        }).when('/account/manage', {
            templateUrl: 'Account/Manage',
            controller: 'manageAccountController'
        });
    });

    MoreDakka.moreDakka.factory('responseObserver', function ($q, $window, $location) {
        return function (promise) {
            return promise.then(function (successResponse) {
                return successResponse;
            }, function (errorResponse) {
                switch (errorResponse.status) {
                    case 401:
                        $location.path("/account/login");
                }

                return $q.reject(errorResponse);
            });
        };
    });
})(MoreDakka || (MoreDakka = {}));
