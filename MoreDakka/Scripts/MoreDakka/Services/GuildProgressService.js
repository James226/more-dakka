/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    var BossProgress = (function () {
        function BossProgress() {
        }
        return BossProgress;
    })();
    MoreDakka.BossProgress = BossProgress;

    var GuildProgressService = (function () {
        function GuildProgressService($http) {
            this.$http = $http;
        }
        GuildProgressService.prototype.getProgress = function () {
            if (this.guildProgressPromise == null) {
                this.guildProgressPromise = this.$http.get('api/GuildProgress');
            }
            return this.guildProgressPromise;
        };
        return GuildProgressService;
    })();
    MoreDakka.GuildProgressService = GuildProgressService;
    MoreDakka.moreDakka.service('guildProgressService', ['$http', GuildProgressService]);
})(MoreDakka || (MoreDakka = {}));
