/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />

module MoreDakka.Controllers.Recruitment {

    class ListController {

        constructor(private $scope, $location: ng.ILocationService, applicationService: ApplicationService) {
            applicationService.getApplications()
                .then(apps => $scope.applications = apps);

            $scope.openApplication = (app) => {
                $location.path('/recruitment/view/' + app.Id);
            }
        }
    }

    moreDakka.controller('recruitment.listController', ListController);
}