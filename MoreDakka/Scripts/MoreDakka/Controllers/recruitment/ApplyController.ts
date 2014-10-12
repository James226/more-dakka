/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />

module MoreDakka.Controllers.Recruitment {
    class Character {
        characterName: string;
        realmName: string;
        className: string;
        race: string;
        thumbnail: string;
        level: number;
    }

    class Application {
        characterName: string;
        realmName: string;
        username: string;
        emailAddress: string;
        password: string;
        character: Character;

        constructor() {
            this.character = null;
        }
    }

    class ApplyController {
        updateTimer: ng.IPromise<any>;
        races: any[];
        classes: any[];
        constructor(private $scope, private $timeout: ng.ITimeoutService, private $http: ng.IHttpService) {
            this.races = [];
            this.classes = [];

            $scope.application = new Application();

            $scope.updateCharacter = () => {
                if (this.updateTimer != undefined) {
                    $timeout.cancel(this.updateTimer);
                }
                this.updateTimer = $timeout(() => this.updateCharacter(), 3000);
            };

            $http
                .jsonp<any>('http://eu.battle.net/api/wow/data/character/races?jsonp=JSON_CALLBACK')
                .success(data => {
                    this.races = [];
                    for (var i in data.races) {
                        this.races[data.races[i].id] = {
                            name: data.races[i].name,
                            side: data.races[i].side
                        }
                    }
                });

            $http
                .jsonp<any>('http://eu.battle.net/api/wow/data/character/classes?jsonp=JSON_CALLBACK')
                .success(data => {
                    this.classes = [];
                    for (var i in data.classes) {
                        this.classes[data.classes[i].id] = {
                            name: data.classes[i].name,
                        }
                    }
                });

            $scope.getClass = (classNo) => {
                if (this.classes[classNo] == undefined) return classNo;
                return this.classes[classNo].name;
            }

            $scope.getRace = (race) => {
                if (this.races[race] == undefined) return race;
                return this.races[race].name;
            }
        }

        updateCharacter = () => {
            var application = this.$scope.application;
            if (application.characterName == undefined || application.characterName == '' ||
                application.realmName == undefined || application.realmName == '') return;
            console.log("Update Character");

            this.$http
                .jsonp<any>("http://eu.battle.net/api/wow/character/" + application.realmName + "/" + application.characterName + "?jsonp=JSON_CALLBACK")
                .success(data => this.$scope.application.character = {
                    characterName: data.name,
                    realmName: data.realm,
                    className: data.class,
                    race: data.race,
                    level: data.level,
                    thumbnail: 'http://eu.battle.net/static-render/eu/' + data.thumbnail
        });
        }
    }

    moreDakka.controller('applyController', ApplyController);
}