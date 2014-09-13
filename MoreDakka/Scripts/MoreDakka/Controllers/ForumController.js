/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../MoreDakka.ts" />
/// <reference path="../Services/ForumService.ts" />
var MoreDakka;
(function (MoreDakka) {
    (function (Controllers) {
        var ForumController = (function () {
            function ForumController($scope, forumService) {
                this.$scope = $scope;
                this.forumService = forumService;
                $scope.boards = [];

                forumService.getBoards().then(function (boards) {
                    $scope.boards = boards;
                });
            }
            return ForumController;
        })();
        Controllers.ForumController = ForumController;

        MoreDakka.moreDakka.controller('forumController', ['$scope', 'forumService', ForumController]);
    })(MoreDakka.Controllers || (MoreDakka.Controllers = {}));
    var Controllers = MoreDakka.Controllers;
})(MoreDakka || (MoreDakka = {}));
