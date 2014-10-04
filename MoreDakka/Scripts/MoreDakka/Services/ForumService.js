/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    var Board = (function () {
        function Board() {
        }
        return Board;
    })();
    MoreDakka.Board = Board;

    var Topic = (function () {
        function Topic() {
        }
        return Topic;
    })();
    MoreDakka.Topic = Topic;

    var BoardViewModel = (function () {
        function BoardViewModel() {
        }
        return BoardViewModel;
    })();
    MoreDakka.BoardViewModel = BoardViewModel;

    var ForumViewModel = (function () {
        function ForumViewModel(id, title, totalPosts, lastPost) {
            this.id = id;
            this.title = title;
            this.totalPosts = totalPosts;
            this.lastPost = new Date(Date.parse(lastPost));
        }
        return ForumViewModel;
    })();
    MoreDakka.ForumViewModel = ForumViewModel;

    var Post = (function () {
        function Post() {
        }
        return Post;
    })();
    MoreDakka.Post = Post;

    var TopicViewModel = (function () {
        function TopicViewModel(id, username, authorPosts, body, postedAt) {
            this.id = id;
            this.username = username;
            this.authorPosts = authorPosts;
            this.body = body;
            this.postedAt = new Date(Date.parse(postedAt));
        }
        return TopicViewModel;
    })();
    MoreDakka.TopicViewModel = TopicViewModel;

    var ForumService = (function () {
        function ForumService($http, textMarkupService) {
            this.$http = $http;
            this.textMarkupService = textMarkupService;
        }
        ForumService.prototype.getBoards = function () {
            var _this = this;
            if (this.boardPromise == null) {
                this.boardPromise = this.$http.get('api/forum/board').then(function (data) {
                    return _this.boards = data.data;
                }).then(function () {
                    return _this.boards;
                });
            }
            return this.boardPromise;
        };

        ForumService.prototype.getTopics = function (boardId) {
            return this.$http.get('api/forum/topic/' + boardId).then(function (data) {
                var posts = [];
                for (var i in data.data) {
                    var record = data.data[i];
                    posts.push(new ForumViewModel(record.id, record.title, record.totalPosts, record.lastPost));
                }
                return posts;
            });
        };

        ForumService.prototype.getPosts = function (topicId) {
            var _this = this;
            return this.$http.get('api/forum/post/' + topicId).then(function (data) {
                var posts = [];
                for (var i in data.data) {
                    var record = data.data[i];
                    posts.push(new TopicViewModel(record.id, record.username, record.authorPosts, _this.textMarkupService.markUp(record.body), record.postedAt));
                }
                return posts;
            });
        };

        ForumService.prototype.createTopic = function (boardId, title, body) {
            return this.$http.post('api/forum/topic', { BoardId: boardId, Title: title, Body: body }).then(function (data) {
                return data.data;
            });
        };

        ForumService.prototype.createPost = function (topicId, body) {
            return this.$http.post('api/forum/post', { TopicId: topicId, Body: body }).then(function (data) {
                return data.data;
            });
        };
        return ForumService;
    })();
    MoreDakka.ForumService = ForumService;
    MoreDakka.moreDakka.service('forumService', ['$http', 'textMarkupService', ForumService]);
})(MoreDakka || (MoreDakka = {}));
