/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />

module MoreDakka.Controllers.Account {
    export class RegisterController {
        constructor(private $scope, private $location: ng.ILocationService) {
            $scope.boards = [];
        }
    }

    moreDakka.controller('registerController', ['$scope', '$location', RegisterController]);
}