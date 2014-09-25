/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />

module MoreDakka {
    export class BossProgress {
        Name: string;
        NormalKills: string;
        HeroicKills: string;
    }

    export class GuildProgressService {
        private guildProgressPromise: ng.IPromise<BossProgress[]>;

        constructor(private $http: ng.IHttpService) {

        }

        getProgress() {
            if (this.guildProgressPromise == null) {
                this.guildProgressPromise = this.$http
                    .get<BoardViewModel[]>('api/GuildProgress')
            }
            return this.guildProgressPromise;
        }
    }
    moreDakka.service('guildProgressService', ['$http', GuildProgressService]);
}