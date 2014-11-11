/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../MoreDakka.ts" />

module MoreDakka {
    export interface IHistoryModel {
        lastRead: Date;    
    }

    export class HistoryService {
        constructor(private $http: ng.IHttpService, private $localStorage) {
            this.$localStorage.$default({
                history: {
                    lastRead: new Date(0)
                }
            });
        }

        isRead(postDate: Date) {
            var history: IHistoryModel = this.$localStorage.history;
            return history.lastRead >= postDate;
        }

        markRead(postDate: Date) {
            var history: IHistoryModel = this.$localStorage.history;
            if (postDate > history.lastRead) {
                history.lastRead = postDate;
            }
        }
    }
    moreDakka.service('historyService', HistoryService);
}