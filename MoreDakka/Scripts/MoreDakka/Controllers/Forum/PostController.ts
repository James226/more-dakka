/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
/// <reference path="../../Services/ForumService.ts" />
/// <reference path="../../Services/TextMarkupService.ts" />

interface Window {
    md5: any;
}

module MoreDakka.Controllers.Forum {
    export class PostController {
        constructor(private $scope, private $location: ng.ILocationService, $routeParams, $sce: ng.ISCEService, forumService: ForumService, textMarkupService: TextMarkupService) {
            $scope.boards = [];

            var topicId = $routeParams.topic_id;
            forumService.getPosts(topicId).then(posts => {
                $scope.posts = posts;
            });

            $scope.postBody = '';
            $scope.boardId = $routeParams.board_id;
            $scope.topicId = topicId;
            $scope.goToBoard = (boardId) =>
                $location.path('/forums/' + boardId);

            $scope.createPost = () =>
                forumService
                .createPost(topicId, $scope.postBody)
                .then(post => $scope.posts.push(new TopicViewModel(post.id, post.username, post.gravatarHash, post.authorPosts, post.body, post.postedAt, post.editable)))
                .then(() => $scope.postBody = '');

            $scope.markUp = (text) => $sce.trustAsHtml(window.marked(text));

            $scope.quote = (post: TopicViewModel) => {
                $scope.postBody += post.body.replace(/^(.*)$/gm, l => '> ' + l) + '\n> \n> <footer>' + post.username + '</footer>\n\n';
            };

            $scope.editPost = (post: TopicViewModel) => {
                post.pendingAction = true;
                forumService
                    .editPost(post.id, post.body)
                    .then(p => {
                        post.editing = false;
                        post.pendingAction = false;
                    });
            };
        }
    }

    moreDakka.controller('postController', ['$scope', '$location', '$routeParams', '$sce', 'forumService', 'textMarkupService', PostController]);
}