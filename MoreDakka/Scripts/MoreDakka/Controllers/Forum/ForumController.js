/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
/// <reference path="../../Services/ForumService.ts" />
var MoreDakka;
(function (MoreDakka) {
    (function (Controllers) {
        (function (Forum) {
            var ForumController = (function () {
                function ForumController($scope, $location, forumService) {
                    this.$scope = $scope;
                    this.$location = $location;
                    $scope.boards = [];

                    forumService.getBoards().then(function (boards) {
                        $scope.boards = boards;
                    });

                    $scope.openBoard = function (id) {
                        $location.path('/forums/' + id);
                    };
                }
                return ForumController;
            })();
            Forum.ForumController = ForumController;

            MoreDakka.moreDakka.controller('forumController', ['$scope', '$location', 'forumService', ForumController]);
        })(Controllers.Forum || (Controllers.Forum = {}));
        var Forum = Controllers.Forum;
    })(MoreDakka.Controllers || (MoreDakka.Controllers = {}));
    var Controllers = MoreDakka.Controllers;
})(MoreDakka || (MoreDakka = {}));
//# sourceMappingURL=ForumController.js.map
