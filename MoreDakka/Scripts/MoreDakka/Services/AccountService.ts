/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />

module MoreDakka {
    export class AccountService {
        private loggedIn: boolean;
        private username: string;

        constructor(private $http: ng.IHttpService) {

        }

        login(username: string, password: string, antiForgeryToken: string) {
            return $.post(
                '/Account/Login',
                {
                    username: username,
                    password: password,
                    __RequestVerificationToken: antiForgeryToken
                })
            .done((data) => data.data);
        }
    }
    moreDakka.service('accountService', ['$http', AccountService]);
}