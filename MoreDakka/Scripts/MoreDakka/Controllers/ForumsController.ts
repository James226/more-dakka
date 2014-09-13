/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../MoreDakka.ts" />

module MoreDakka {
    class ForumController {
        constructor(private $scope) {
            $scope.message = "Forum 1";
        }
    }

    moreDakka.controller('forumsController', ForumController);
}