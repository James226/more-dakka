/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />

module MoreDakka {
    export class LoginResult {
        Result: boolean;
        ErrorMessage: any;
    }

    export class AccountService {
        private loggedIn: boolean;
        private username: string;

        constructor(private $http: ng.IHttpService) {

        }

        login(username: string, password: string, antiForgeryToken: string) {
            return this.$http<LoginResult>({
                url: '/Account/Login',
                data: $.param({
                    "username": username,
                    "password": password,
                    "__RequestVerificationToken": antiForgeryToken
                }),
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
                .success((data) => data)
                .error((data) =>
                    ({ Result: false, ErrorMessage: { Value: "An unknown error occured" } }));
        }
    }
    moreDakka.service('accountService', ['$http', AccountService]);
}