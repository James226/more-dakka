/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    (function (Controllers) {
        (function (Recruitment) {
            var ViewController = (function () {
                function ViewController($scope, $routeParams, applicationService) {
                    this.$scope = $scope;
                    var appId = $routeParams.app_id;

                    applicationService.getApplication(appId).then(function (app) {
                        return $scope.application = app;
                    });
                }
                return ViewController;
            })();

            MoreDakka.moreDakka.controller('recruitment.viewController', ViewController);
        })(Controllers.Recruitment || (Controllers.Recruitment = {}));
        var Recruitment = Controllers.Recruitment;
    })(MoreDakka.Controllers || (MoreDakka.Controllers = {}));
    var Controllers = MoreDakka.Controllers;
})(MoreDakka || (MoreDakka = {}));
