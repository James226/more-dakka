/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    (function (ApplicationStatus) {
        ApplicationStatus[ApplicationStatus["Accepted"] = 0] = "Accepted";
        ApplicationStatus[ApplicationStatus["Undecided"] = 1] = "Undecided";
        ApplicationStatus[ApplicationStatus["Declined"] = 2] = "Declined";
    })(MoreDakka.ApplicationStatus || (MoreDakka.ApplicationStatus = {}));
    var ApplicationStatus = MoreDakka.ApplicationStatus;

    var Application = (function () {
        function Application() {
        }
        return Application;
    })();
    MoreDakka.Application = Application;

    var ApplicationService = (function () {
        function ApplicationService($http) {
            this.$http = $http;
        }
        ApplicationService.prototype.getApplications = function () {
            var _this = this;
            if (this.applicationsPromise == null) {
                return this.applicationsPromise = this.$http.get('/Recruitment/Applications').then(function (data) {
                    _this.applications = data.data;
                    for (var i in _this.applications) {
                        _this.applications[i].Submission = JSON.parse(_this.applications[i].Submission);
                    }
                    return _this.applications;
                }).then(function () {
                    return _this.applications;
                });
            }
            return this.applicationsPromise;
        };

        ApplicationService.prototype.getApplication = function (appId) {
            return this.getApplications().then(function (apps) {
                for (var i in apps) {
                    if (apps[i].Id == appId) {
                        return apps[i];
                    }
                }
                return null;
            });
        };

        ApplicationService.prototype.updateStatus = function (application, status) {
            this.$http.put("/Recruitment/SetStatus", { 'id': application.Id, 'status': status });
        };

        ApplicationService.prototype.getOwnApplication = function () {
            return this.$http.get('/Recruitment/Application').then(function (data) {
                data.data.Submission = JSON.parse(data.data.Submission);
                return data.data;
            });
        };
        return ApplicationService;
    })();
    MoreDakka.ApplicationService = ApplicationService;
    MoreDakka.moreDakka.service('applicationService', ['$http', ApplicationService]);
})(MoreDakka || (MoreDakka = {}));
//# sourceMappingURL=ApplicationService.js.map
