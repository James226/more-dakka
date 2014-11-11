/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    var HistoryService = (function () {
        function HistoryService($http, $localStorage) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.$localStorage.$default({
                history: {
                    lastRead: new Date(0)
                }
            });
        }
        HistoryService.prototype.isRead = function (postDate) {
            var history = this.$localStorage.history;
            return history.lastRead >= postDate;
        };

        HistoryService.prototype.markRead = function (postDate) {
            var history = this.$localStorage.history;
            if (postDate > history.lastRead) {
                history.lastRead = postDate;
            }
        };
        return HistoryService;
    })();
    MoreDakka.HistoryService = HistoryService;
    MoreDakka.moreDakka.service('historyService', HistoryService);
})(MoreDakka || (MoreDakka = {}));
//# sourceMappingURL=HistoryService.js.map
