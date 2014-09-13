/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />

module MoreDakka {
    export class Board {
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
    }
    moreDakka.service('forumService', ['$http', ForumService]);
}