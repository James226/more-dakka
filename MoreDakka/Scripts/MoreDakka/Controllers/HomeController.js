/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    var HomeController = (function () {
        function HomeController($scope, guildProgressService) {
            this.$scope = $scope;
            guildProgressService.getProgress().then(function (data) {
                $scope.raidProgress = data.data;
            });

            $scope.stripSpaces = function (str) {
                return str.replace(/[\s|\']/g, '');
            };
        }
        return HomeController;
    })();

    MoreDakka.moreDakka.controller('homeController', HomeController);
})(MoreDakka || (MoreDakka = {}));
//# sourceMappingURL=HomeController.js.map
