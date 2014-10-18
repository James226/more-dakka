/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    (function (Controllers) {
        (function (Recruitment) {
            var ListController = (function () {
                function ListController($scope, $location, applicationService) {
                    this.$scope = $scope;
                    applicationService.getApplications().then(function (apps) {
                        return $scope.applications = apps;
                    });

                    $scope.openApplication = function (app) {
                        $location.path('/recruitment/view/' + app.Id);
                    };
                }
                return ListController;
            })();

            MoreDakka.moreDakka.controller('recruitment.listController', ListController);
        })(Controllers.Recruitment || (Controllers.Recruitment = {}));
        var Recruitment = Controllers.Recruitment;
    })(MoreDakka.Controllers || (MoreDakka.Controllers = {}));
    var Controllers = MoreDakka.Controllers;
})(MoreDakka || (MoreDakka = {}));
