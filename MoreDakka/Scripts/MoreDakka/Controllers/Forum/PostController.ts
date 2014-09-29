/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
/// <reference path="../../Services/ForumService.ts" />
/// <reference path="../../Services/TextMarkupService.ts" />

module MoreDakka.Controllers.Forum {
    export class PostController {
        constructor(private $scope, private $location: ng.ILocationService, $routeParams, $sce : ng.ISCEService, forumService: ForumService, textMarkupService: TextMarkupService) {
            $scope.boards = [];

            var topicId = $routeParams.topic_id;
            forumService.getPosts(topicId).then(posts => {
                $scope.posts = posts;
            });

            $scope.boardId = $routeParams.board_id;
            $scope.topicId = topicId;
            $scope.goToBoard = (boardId) =>
                $location.path('/forums/' + boardId);

            $scope.createPost = () =>
                forumService
                    .createPost(topicId, $scope.postBody)
                    .then(post => $scope.posts.push(post));

            $scope.markUp = (text) => $sce.trustAsHtml(textMarkupService.markUp(text));
        }
    }

    moreDakka.controller('postController', ['$scope', '$location', '$routeParams', '$sce', 'forumService', 'textMarkupService', PostController]);
}