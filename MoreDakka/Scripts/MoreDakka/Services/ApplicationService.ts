/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />

module MoreDakka {
    export class Application {
        Id: string;
        SubmittedAt: Date;
        Submission: string;
    }

    export class ApplicationService {
        private applications: Application[];
        private applicationsPromise: ng.IPromise<Application[]>;

        constructor(private $http: ng.IHttpService) {
        }

        getApplications() {
            if (this.applicationsPromise == null) {
                return this.applicationsPromise = this.$http
                    .get<Application[]>('/Recruitment/Applications')
                    .then(data => {
                        this.applications = data.data;
                        for (var i in this.applications) {
                            this.applications[i].Submission = JSON.parse(this.applications[i].Submission);
                        }
                        return this.applications;
                    })
                    .then(() => this.applications);
            }
            return this.applicationsPromise;
        }

        getApplication(appId: string) {
            return this.getApplications()
                .then(apps => {
                    for (var i in apps) {
                        if (apps[i].Id == appId) {
                            return apps[i];
                        }
                    }
                return null;
            });
        }

        getOwnApplication() {
                return this.$http
                    .get<Application>('/Recruitment/Application')
                    .then(data => {
                        data.data.Submission = JSON.parse(data.data.Submission);
                        return data.data;
                    });
        }
    }
    moreDakka.service('applicationService', ['$http', ApplicationService]);
}