/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    (function (Controllers) {
        (function (Account) {
            var RegisterController = (function () {
                function RegisterController($scope, $location) {
                    this.$scope = $scope;
                    this.$location = $location;
                    $scope.boards = [];
                }
                return RegisterController;
            })();
            Account.RegisterController = RegisterController;

            MoreDakka.moreDakka.controller('registerController', ['$scope', '$location', RegisterController]);
        })(Controllers.Account || (Controllers.Account = {}));
        var Account = Controllers.Account;
    })(MoreDakka.Controllers || (MoreDakka.Controllers = {}));
    var Controllers = MoreDakka.Controllers;
})(MoreDakka || (MoreDakka = {}));
//# sourceMappingURL=RegisterController.js.map
