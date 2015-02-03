/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../MoreDakka.ts" />
/// <reference path="../Services/TextMarkupService.ts" />
var MoreDakka;
(function (MoreDakka) {
    var HomeController = (function () {
        function HomeController($scope, $http, guildProgressService, $sce) {
            this.$scope = $scope;
            guildProgressService.getProgress().then(function (data) {
                $scope.raidProgress = data.data;
            });

            $scope.stripSpaces = function (str) {
                return str.replace(/[\s|\']/g, '');
            };

            $scope.markUp = function (text) {
                return $sce.trustAsHtml(window.marked(text));
            };

            $scope.editable = false;

            $http.get("/api/Page/Home").success(function (data) {
                $scope.editable = data.Editable;
                $scope.homeContent = data.Page.Body;
            });

            $scope.submitHomePage = function () {
                $http.put("/api/Page", { Name: 'Home', Body: $scope.homeContent }).success(function () {
                    return $scope.editing = false;
                }).error(function () {
                    return alert("Failed to save home page.");
                });
            };
        }
        return HomeController;
    })();

    MoreDakka.moreDakka.controller('homeController', HomeController);
})(MoreDakka || (MoreDakka = {}));
//# sourceMappingURL=HomeController.js.map
