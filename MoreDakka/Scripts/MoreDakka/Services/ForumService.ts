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
    }

    export class ForumViewModel {
        id: string;
        title: string;
        totalPosts: number;
    }

    export class Post {
        TopicId: string;
        Body: string;
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
                .get<ForumViewModel[]>('api/forum/topic/' + boardId)
                .then(data => data.data);
        }

        getPosts(topicId: string) {
            return this.$http
                .get<Post[]>('api/forum/post/' + topicId)
                .then(data => data.data);
        }

        createTopic(boardId: string, title: string, body: string) {
            return this.$http
                .post<Post>('api/forum/topic', { BoardId: boardId, Title: title, Body: body })
                .then(data => data.data);
        }

        createPost(topicId: string, body: string) {
            return this.$http
                .post<Post>('api/forum/post', { TopicId: topicId, Body: body })
                .then(data => data.data);
        }
    }
    moreDakka.service('forumService', ['$http', ForumService]);
}