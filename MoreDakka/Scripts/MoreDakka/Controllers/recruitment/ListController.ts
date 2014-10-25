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

            $scope.getStatusClass = app => {
                switch (app.Status) {
                    case ApplicationStatus.Accepted:
                        return 'glyphicon-ok';
                    case ApplicationStatus.Declined:
                        return 'glyphicon-remove';
                    default:
                        return 'glyphicon-question-sign';
                }
            };
        }
    }

    moreDakka.controller('recruitment.listController', ListController);
}