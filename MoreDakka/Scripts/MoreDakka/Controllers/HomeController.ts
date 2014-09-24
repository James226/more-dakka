/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../MoreDakka.ts" />

module MoreDakka {
    class HomeController {
        constructor(private $scope, $http : ng.IHttpService) {
            $http
                .get('/api/guildprogress')
                .success(data => {
                    $scope.raidProgress = data;
                });
        }
    }

    moreDakka.controller('homeController', HomeController);
}