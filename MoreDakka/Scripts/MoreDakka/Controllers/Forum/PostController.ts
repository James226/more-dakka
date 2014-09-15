/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
/// <reference path="../../Services/ForumService.ts" />

module MoreDakka.Controllers.Forum {
    export class PostController {
        constructor(private $scope, private $location: ng.ILocationService, $routeParams, forumService: ForumService) {
            $scope.boards = [];

            var topicId = $routeParams.topic_id;
            forumService.getPosts(topicId).then(posts => {
                $scope.posts = posts;
            });

            $scope.boardId = $routeParams.board_id;
            $scope.topicId = topicId;
            $scope.goToBoard = (boardId) =>
                $location.path('/forums/' + boardId);
        }
    }

    moreDakka.controller('postController', ['$scope', '$location', '$routeParams', 'forumService', PostController]);
}