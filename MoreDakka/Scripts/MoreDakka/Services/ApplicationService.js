/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
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
        return ApplicationService;
    })();
    MoreDakka.ApplicationService = ApplicationService;
    MoreDakka.moreDakka.service('applicationService', ['$http', ApplicationService]);
})(MoreDakka || (MoreDakka = {}));
