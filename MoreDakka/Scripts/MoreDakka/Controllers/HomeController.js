/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    var HomeController = (function () {
        function HomeController($scope, $http) {
            this.$scope = $scope;
            $http.get('/api/guildprogress').success(function (data) {
                $scope.raidProgress = data;
            });
        }
        return HomeController;
    })();

    MoreDakka.moreDakka.controller('homeController', HomeController);
})(MoreDakka || (MoreDakka = {}));
//# sourceMappingURL=HomeController.js.map
