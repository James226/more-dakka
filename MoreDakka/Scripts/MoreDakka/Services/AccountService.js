/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    var LoginResult = (function () {
        function LoginResult() {
        }
        return LoginResult;
    })();
    MoreDakka.LoginResult = LoginResult;

    var AccountService = (function () {
        function AccountService($http) {
            this.$http = $http;
        }
        AccountService.prototype.login = function (username, password, antiForgeryToken) {
            return this.$http({
                url: '/Account/Login',
                data: $.param({
                    "username": username,
                    "password": password,
                    "__RequestVerificationToken": antiForgeryToken
                }),
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data) {
                return data;
            }).error(function (data) {
                return ({ Result: false, ErrorMessage: { Value: "An unknown error occured" } });
            });
        };
        return AccountService;
    })();
    MoreDakka.AccountService = AccountService;
    MoreDakka.moreDakka.service('accountService', ['$http', AccountService]);
})(MoreDakka || (MoreDakka = {}));
//# sourceMappingURL=AccountService.js.map
