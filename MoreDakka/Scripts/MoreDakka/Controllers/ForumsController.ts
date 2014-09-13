/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../MoreDakka.ts" />

module MoreDakka {
    class ForumController {
        constructor(private $scope) {
        }
    }

    moreDakka.controller('forumController', ForumController);
}