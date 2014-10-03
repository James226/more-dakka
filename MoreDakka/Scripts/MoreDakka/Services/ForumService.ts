/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />

module MoreDakka {
    export class Board {
        Id: string;
        Name: string;
    }

    export class Topic {
        Id: string;
        Name: string;
    }

    export class BoardViewModel {
        id: string;
        name: string;
        totalTopics: number;
        lastTopicId: string;
        lastTopicTitle: string;
        lastPostAuthor: string;
    }

    export class ForumViewModel {
        id: string;
        title: string;
        totalPosts: number;
        lastPost: Date;

        constructor(id: string, title: string, totalPosts: number, lastPost: string) {
            this.id = id;
            this.title = title;
            this.totalPosts = totalPosts;
            this.lastPost = new Date(Date.parse(lastPost));
        }
    }

    export class Post {
        TopicId: string;
        Body: string;
    }

    export class TopicViewModel {
        id: string;
        username: string;
        body: string;
        postedAt: Date;

        constructor(id: string, username: string, body: string, postedAt: string) {
            this.id = id;
            this.username = username;
            this.body = body;
            this.postedAt = new Date(Date.parse(postedAt));
        }
    }

    export class ForumService {
        boards: BoardViewModel[];
        boardPromise: ng.IPromise<BoardViewModel[]>;

        constructor(private $http: ng.IHttpService) {

        }

        getBoards() {
            if (this.boardPromise == null) {
                this.boardPromise = this.$http
                    .get<BoardViewModel[]>('api/forum/board')
                    .then(data => this.boards = data.data)
                    .then(() => this.boards);
            }
            return this.boardPromise;
        }

        getTopics(boardId: string) {
            return this.$http
                .get<any[]>('api/forum/topic/' + boardId)
                .then(data => {
                    var posts: ForumViewModel[] = [];
                    for (var i in data.data) {
                        var record = data.data[i];
                        posts.push(new ForumViewModel(record.id, record.title, record.totalPosts, record.lastPost));
                    }
                    return posts;
                });
        }

        getPosts(topicId: string) {
            return this.$http
                .get<any[]>('api/forum/post/' + topicId)
                .then(data => {
                    var posts: TopicViewModel[] = [];
                    for (var i in data.data) {
                        var record = data.data[i];
                        posts.push(new TopicViewModel(record.id, record.username, record.body, record.postedAt));
                    }
                    return posts;
                });
        }

        createTopic(boardId: string, title: string, body: string) {
            return this.$http
                .post<any>('api/forum/topic', { BoardId: boardId, Title: title, Body: body })
                .then(data => data.data);
        }

        createPost(topicId: string, body: string) {
            return this.$http
                .post<any>('api/forum/post', { TopicId: topicId, Body: body })
                .then(data => data.data);
        }
    }
    moreDakka.service('forumService', ['$http', ForumService]);
}