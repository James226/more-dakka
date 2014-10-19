/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />

module MoreDakka.Controllers.Recruitment {

    class ViewController {

        constructor(private $scope, $routeParams, applicationService: ApplicationService) {
            var appId = $routeParams.app_id;

            applicationService
                .getApplication(appId)
                .then(app => $scope.application = app);

            $scope.toTitleCase = (text) =>
                text
                    .replace(/[A-Z]/g, (txt) => ' ' + txt)
                    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

        }
    }

    moreDakka.controller('recruitment.viewController', ViewController);
}