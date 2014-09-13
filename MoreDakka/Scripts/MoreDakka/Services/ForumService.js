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

    var ForumService = (function () {
        function ForumService($http) {
            this.$http = $http;
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
        return ForumService;
    })();
    MoreDakka.ForumService = ForumService;
    MoreDakka.moreDakka.service('forumService', ['$http', ForumService]);
})(MoreDakka || (MoreDakka = {}));
