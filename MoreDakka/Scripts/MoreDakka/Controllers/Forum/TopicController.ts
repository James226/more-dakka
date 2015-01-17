/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
/// <reference path="../../Services/ForumService.ts" />

module MoreDakka.Controllers.Forum {
    export class TopicController {
        constructor(private $scope, private $location: ng.ILocationService, $routeParams, forumService: ForumService) {
            $scope.boards = [];

            var boardId = $routeParams.board_id;
            forumService.getTopics(boardId).then(topics => {
                $scope.topics = topics;
            });

            $scope.openTopic = id => {
                $location.path('/forums/' + boardId + '/' + id);
            };

            $scope.topicUrl = id => {
                return '/#/forums/' + boardId + '/' + id;
            }

            $scope.goToForum = () =>
                $location.path('/forums');

            $scope.createTopic = () =>
                forumService
                    .createTopic(boardId, $scope.title, $scope.body)
                    .then(topic => $scope.topics.push(new ForumViewModel(topic.id, topic.title, TopicType.Standard, topic.totalPosts, topic.lastPost, true)))
                    .then(() => { $scope.title = ''; $scope.body = ''; });
        }
    }

    moreDakka.controller('topicController', ['$scope', '$location', '$routeParams', 'forumService', TopicController]);
}