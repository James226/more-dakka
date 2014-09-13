/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../MoreDakka.ts" />
/// <reference path="../Services/ForumService.ts" />

module MoreDakka.Controllers {
    export class ForumController {
        constructor(private $scope, private forumService: ForumService) {
            $scope.boards = [];

            forumService.getBoards().then(boards => {
                $scope.boards = boards;
            });
        }
    }

    moreDakka.controller('forumController', ['$scope', 'forumService', ForumController]);
}