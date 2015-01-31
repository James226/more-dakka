/// <reference path="../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    var LootController = (function () {
        function LootController($scope, $http) {
            this.$scope = $scope;
            $scope.characters = [];

            $scope.addCharacter = function () {
                $http.jsonp("https://eu.battle.net/api/wow/character/Doomhammer/" + $scope.newCharacterName + "?fields=items&jsonp=JSON_CALLBACK").success(function (data) {
                    console.log(data);
                    $scope.characters.push(data);

                    $scope.newCharacterName = '';
                });
            };
        }
        return LootController;
    })();

    MoreDakka.moreDakka.controller('lootController', LootController);
})(MoreDakka || (MoreDakka = {}));
//# sourceMappingURL=LootController.js.map
