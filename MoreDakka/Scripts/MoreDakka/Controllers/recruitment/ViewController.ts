/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />

module MoreDakka.Controllers.Recruitment {

    class ViewController {

        constructor(private $scope, $routeParams, applicationService: ApplicationService) {
            var appId = $routeParams.app_id;

            applicationService
                .getApplication(appId)
                .then(app => $scope.application = app);
        }
    }

    moreDakka.controller('recruitment.viewController', ViewController);
}