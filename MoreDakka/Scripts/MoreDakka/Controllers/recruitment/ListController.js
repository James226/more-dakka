/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    (function (Controllers) {
        (function (Recruitment) {
            var ListController = (function () {
                function ListController($scope, $http) {
                    this.$scope = $scope;
                    this.$http = $http;
                    $http.get('/Recruitment/Applications').success(function (data) {
                        $scope.applications = [];
                        for (var i in data) {
                            data[i].Submission = JSON.parse(data[i].Submission);
                            $scope.applications.push(data[i]);
                        }
                    });
                }
                return ListController;
            })();

            MoreDakka.moreDakka.controller('recruitment.listController', ListController);
        })(Controllers.Recruitment || (Controllers.Recruitment = {}));
        var Recruitment = Controllers.Recruitment;
    })(MoreDakka.Controllers || (MoreDakka.Controllers = {}));
    var Controllers = MoreDakka.Controllers;
})(MoreDakka || (MoreDakka = {}));
