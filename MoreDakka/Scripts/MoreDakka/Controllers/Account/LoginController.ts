/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
/// <reference path="../../Services/AccountService.ts" />

module MoreDakka.Controllers.Forum {
    export class LoginController {
        constructor(private $scope, private $rootScope, private $location: ng.ILocationService, private accountService: AccountService) {
            $scope.login = () => {
                accountService
                    .login($scope.username, $scope.password, $('input[name=__RequestVerificationToken]').val())
                    .then(result => {
                        $scope.errorMessage = result.ErrorMessage;
                        if (!$rootScope.$$phase) $rootScope.$apply();

                        if (!result.Result) return;

                        window.location.href = '/';
                    });
                    
            }
        }
    }

    moreDakka.controller('loginController', ['$scope', '$rootScope', '$location', 'accountService', LoginController]);
}