/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
/// <reference path="../../Services/ForumService.ts" />
var MoreDakka;
(function (MoreDakka) {
    (function (Controllers) {
        (function (Forum) {
            var TopicController = (function () {
                function TopicController($scope, $location, $routeParams, forumService) {
                    this.$scope = $scope;
                    this.$location = $location;
                    $scope.boards = [];

                    var boardId = $routeParams.board_id;
                    forumService.getTopics(boardId).then(function (topics) {
                        $scope.topics = topics;
                    });

                    $scope.openTopic = function (id) {
                        $location.path('/forums/' + boardId + '/' + id);
                    };
                }
                return TopicController;
            })();
            Forum.TopicController = TopicController;

            MoreDakka.moreDakka.controller('topicController', ['$scope', '$location', '$routeParams', 'forumService', TopicController]);
        })(Controllers.Forum || (Controllers.Forum = {}));
        var Forum = Controllers.Forum;
    })(MoreDakka.Controllers || (MoreDakka.Controllers = {}));
    var Controllers = MoreDakka.Controllers;
})(MoreDakka || (MoreDakka = {}));
