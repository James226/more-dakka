/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
/// <reference path="../../Services/AccountService.ts" />
var MoreDakka;
(function (MoreDakka) {
    (function (Controllers) {
        (function (Forum) {
            var LoginController = (function () {
                function LoginController($scope, $rootScope, $location, accountService) {
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$location = $location;
                    this.accountService = accountService;
                    $scope.errorMessage = '';

                    $scope.login = function () {
                        accountService.login($scope.username, $scope.password, $('input[name=__RequestVerificationToken]').val()).then(function (result) {
                            if (result.data.Result) {
                                window.location.href = '/';
                            } else {
                                $scope.errorMessage = result.data.ErrorMessage.Value;
                                if (!$rootScope.$$phase)
                                    $rootScope.$apply();
                            }
                        });
                    };
                }
                return LoginController;
            })();
            Forum.LoginController = LoginController;

            MoreDakka.moreDakka.controller('loginController', ['$scope', '$rootScope', '$location', 'accountService', LoginController]);
        })(Controllers.Forum || (Controllers.Forum = {}));
        var Forum = Controllers.Forum;
    })(MoreDakka.Controllers || (MoreDakka.Controllers = {}));
    var Controllers = MoreDakka.Controllers;
})(MoreDakka || (MoreDakka = {}));
