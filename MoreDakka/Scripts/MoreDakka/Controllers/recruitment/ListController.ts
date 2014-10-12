/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />

module MoreDakka.Controllers.Recruitment {

    class ListController {

        constructor(private $scope, private $http: ng.IHttpService) {
            $http.get<any[]>('/Recruitment/Applications')
                .success(data => {
                    $scope.applications = [];
                    for (var i in data) {
                        data[i].Submission = JSON.parse(data[i].Submission);
                        $scope.applications.push(data[i]);
                    }
                });
        }
    }

    moreDakka.controller('recruitment.listController', ListController);
}