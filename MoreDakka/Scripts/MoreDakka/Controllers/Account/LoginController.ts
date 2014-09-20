/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
/// <reference path="../../Services/AccountService.ts" />

module MoreDakka.Controllers.Forum {
    export class LoginController {
        constructor(private $scope, private $rootScope, private $location: ng.ILocationService, private accountService: AccountService) {
            $scope.errorMessage = '';

            $scope.login = () => {
                accountService
                    .login($scope.username, $scope.password, $('input[name=__RequestVerificationToken]').val())
                    .then(result => {
                        if (result.data.Result) {
                            window.location.href = '/';
                        } else {
                            $scope.errorMessage = result.data.ErrorMessage.Value;
                            if (!$rootScope.$$phase) $rootScope.$apply();
                        }
                    });
                    
            }
        }
    }

    moreDakka.controller('loginController', ['$scope', '$rootScope', '$location', 'accountService', LoginController]);
}