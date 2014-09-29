﻿/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
/// <reference path="../../Services/ForumService.ts" />
/// <reference path="../../Services/TextMarkupService.ts" />
var MoreDakka;
(function (MoreDakka) {
    (function (Controllers) {
        (function (Forum) {
            var PostController = (function () {
                function PostController($scope, $location, $routeParams, $sce, forumService, textMarkupService) {
                    this.$scope = $scope;
                    this.$location = $location;
                    $scope.boards = [];

                    var topicId = $routeParams.topic_id;
                    forumService.getPosts(topicId).then(function (posts) {
                        $scope.posts = posts;
                    });

                    $scope.boardId = $routeParams.board_id;
                    $scope.topicId = topicId;
                    $scope.goToBoard = function (boardId) {
                        return $location.path('/forums/' + boardId);
                    };

                    $scope.createPost = function () {
                        return forumService.createPost(topicId, $scope.postBody).then(function (post) {
                            return $scope.posts.push(post);
                        });
                    };

                    $scope.markUp = function (text) {
                        return $sce.trustAsHtml(textMarkupService.markUp(text));
                    };
                }
                return PostController;
            })();
            Forum.PostController = PostController;

            MoreDakka.moreDakka.controller('postController', ['$scope', '$location', '$routeParams', '$sce', 'forumService', 'textMarkupService', PostController]);
        })(Controllers.Forum || (Controllers.Forum = {}));
        var Forum = Controllers.Forum;
    })(MoreDakka.Controllers || (MoreDakka.Controllers = {}));
    var Controllers = MoreDakka.Controllers;
})(MoreDakka || (MoreDakka = {}));
