/// <reference path="../MoreDakka.ts" />

module MoreDakka {
    class LootController {
        constructor(private $scope, $http: ng.IHttpService) {
            $scope.characters = [];

            $scope.addCharacter = () => {
                $http
                    .jsonp("https://eu.battle.net/api/wow/character/Doomhammer/" + $scope.newCharacterName + "?fields=items&jsonp=JSON_CALLBACK")
                    .success(data => {
                        console.log(data);
                        $scope.characters.push(data);

                        $scope.newCharacterName = '';
                    });
                
            }
        }
    }

    moreDakka.controller('lootController', LootController);
}