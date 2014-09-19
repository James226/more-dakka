/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    var AccountService = (function () {
        function AccountService($http) {
            this.$http = $http;
        }
        AccountService.prototype.login = function (username, password, antiForgeryToken) {
            return $.post('/Account/Login', {
                username: username,
                password: password,
                __RequestVerificationToken: antiForgeryToken
            }).done(function (data) {
                return data.data;
            });
        };
        return AccountService;
    })();
    MoreDakka.AccountService = AccountService;
    MoreDakka.moreDakka.service('accountService', ['$http', AccountService]);
})(MoreDakka || (MoreDakka = {}));
