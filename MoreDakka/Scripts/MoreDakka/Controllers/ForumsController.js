/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    var ForumController = (function () {
        function ForumController($scope) {
            this.$scope = $scope;
            $scope.message = "Forum 1";
        }
        return ForumController;
    })();

    MoreDakka.moreDakka.controller('forumsController', ForumController);
})(MoreDakka || (MoreDakka = {}));
