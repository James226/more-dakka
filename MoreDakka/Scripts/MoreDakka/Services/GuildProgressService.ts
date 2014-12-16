/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />

module MoreDakka {
    export class BossProgress {
        Name: string;
        MythicKills: string;
        HeroicKills: string;
    }

    export class GuildProgressService {
        private guildProgressPromise: ng.IHttpPromise<BossProgress[]>;

        constructor(private $http: ng.IHttpService) {
        }

        getProgress() {
            if (this.guildProgressPromise == null) {
                this.guildProgressPromise = this.$http
                    .get<BossProgress[]>('api/GuildProgress');
            }
            return this.guildProgressPromise;
        }
    }
    moreDakka.service('guildProgressService', ['$http', GuildProgressService]);
}