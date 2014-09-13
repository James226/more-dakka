/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../MoreDakka.ts" />

module MoreDakka {
    class HomeController {
        constructor(private $scope) {
            $scope.message = "Test";
        }
    }

    moreDakka.controller('homeController', HomeController);
}