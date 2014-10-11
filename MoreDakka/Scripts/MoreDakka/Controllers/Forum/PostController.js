/// <reference path="../../../typings/angularjs/angular.d.ts"/>
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

                    $scope.postBody = '';
                    $scope.boardId = $routeParams.board_id;
                    $scope.topicId = topicId;
                    $scope.goToBoard = function (boardId) {
                        return $location.path('/forums/' + boardId);
                    };

                    $scope.createPost = function () {
                        return forumService.createPost(topicId, $scope.postBody).then(function (post) {
                            return $scope.posts.push(new MoreDakka.TopicViewModel(post.id, post.username, post.authorPosts, post.body, post.postedAt));
                        }).then(function () {
                            return $scope.postBody = '';
                        });
                    };

                    $scope.markUp = function (text) {
                        return $sce.trustAsHtml(window.marked(text));
                    };

                    $scope.quote = function (post) {
                        $scope.postBody += post.body.replace(/^(.*)$/gm, function (l) {
                            return '> ' + l;
                        }) + '\n> \n> <footer>' + post.username + '</footer>\n\n';
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
