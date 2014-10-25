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

                    $scope.toTitleCase = function (text) {
                        return text.replace(/[A-Z]/g, function (txt) {
                            return ' ' + txt;
                        }).replace(/\w\S*/g, function (txt) {
                            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                        });
                    };

                    $scope.updateStatus = function () {
                        return applicationService.updateStatus($scope.application, $scope.application.Status);
                    };
                }
                return ViewController;
            })();

            MoreDakka.moreDakka.controller('recruitment.viewController', ViewController);
        })(Controllers.Recruitment || (Controllers.Recruitment = {}));
        var Recruitment = Controllers.Recruitment;
    })(MoreDakka.Controllers || (MoreDakka.Controllers = {}));
    var Controllers = MoreDakka.Controllers;
})(MoreDakka || (MoreDakka = {}));
//# sourceMappingURL=ViewController.js.map
