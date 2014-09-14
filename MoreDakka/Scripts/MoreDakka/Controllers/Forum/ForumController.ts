/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
/// <reference path="../../Services/ForumService.ts" />

module MoreDakka.Controllers.Forum {
    export class ForumController {
        constructor(private $scope, private $location: ng.ILocationService, forumService: ForumService) {
            $scope.boards = [];

            forumService.getBoards().then(boards => {
                $scope.boards = boards;
            });

            $scope.openBoard = id => {
                $location.path('/forums/' + id);
            };
        }
    }

    moreDakka.controller('forumController', ['$scope', '$location', 'forumService', ForumController]);
}