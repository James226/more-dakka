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

    export class ForumService {
        boards: Board[];
        boardPromise: ng.IPromise<Board[]>;

        constructor(private $http: ng.IHttpService) {

        }

        getBoards() {
            if (this.boardPromise == null) {
                this.boardPromise = this.$http
                    .get<Board[]>('api/forum/board')
                    .then(data => this.boards = data.data)
                    .then(() => this.boards);
            }
            return this.boardPromise;
        }

        getTopics(boardId: string) {
            return this.$http
                .get<Topic[]>('api/forum/topic/' + boardId)
                .then(data => data.data);
        }
    }
    moreDakka.service('forumService', ['$http', ForumService]);
}