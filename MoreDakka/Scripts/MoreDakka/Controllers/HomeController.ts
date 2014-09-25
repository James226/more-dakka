/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../MoreDakka.ts" />

module MoreDakka {
    class HomeController {
        constructor(private $scope, guildProgressService : GuildProgressService) {
            guildProgressService.getProgress()
                .then(data => {
                    $scope.raidProgress = data.data;
                });

            $scope.stripSpaces = str => str.replace(/[\s|\']/g, '');
        }
    }

    moreDakka.controller('homeController', HomeController);
}