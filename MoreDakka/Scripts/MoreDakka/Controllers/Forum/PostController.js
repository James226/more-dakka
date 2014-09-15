/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
/// <reference path="../../Services/ForumService.ts" />
var MoreDakka;
(function (MoreDakka) {
    (function (Controllers) {
        (function (Forum) {
            var PostController = (function () {
                function PostController($scope, $location, $routeParams, forumService) {
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
                }
                return PostController;
            })();
            Forum.PostController = PostController;

            MoreDakka.moreDakka.controller('postController', ['$scope', '$location', '$routeParams', 'forumService', PostController]);
        })(Controllers.Forum || (Controllers.Forum = {}));
        var Forum = Controllers.Forum;
    })(MoreDakka.Controllers || (MoreDakka.Controllers = {}));
    var Controllers = MoreDakka.Controllers;
})(MoreDakka || (MoreDakka = {}));
