/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../MoreDakka.ts" />
/// <reference path="../Services/TextMarkupService.ts" />

module MoreDakka {
    class HomeController {
        constructor(private $scope, $http: ng.IHttpService, guildProgressService: GuildProgressService, $sce: ng.ISCEService) {
            guildProgressService.getProgress()
                .then(data => {
                    $scope.raidProgress = data.data;
                });

            $scope.stripSpaces = str => str.replace(/[\s|\']/g, '');

            $scope.markUp = (text) => $sce.trustAsHtml(window.marked(text));

            $scope.editable = false;

            $http
                .get<any>("/api/Page/Home")
                .success(data => {
                    $scope.editable = data.Editable;
                    $scope.homeContent = data.Page.Body;
                });

            $scope.submitHomePage = () => {
                $http
                    .put("/api/Page", { Name: 'Home', Body: $scope.homeContent })
                    .success(() => $scope.editing = false)
                    .error(() => alert("Failed to save home page."));
            };
        }
    }

    moreDakka.controller('homeController', HomeController);
}