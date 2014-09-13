/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    var HomeController = (function () {
        function HomeController($scope) {
            this.$scope = $scope;
            $scope.message = "Test";
        }
        return HomeController;
    })();

    MoreDakka.moreDakka.controller('homeController', HomeController);
})(MoreDakka || (MoreDakka = {}));
