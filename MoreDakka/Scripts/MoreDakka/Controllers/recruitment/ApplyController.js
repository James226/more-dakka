﻿/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../MoreDakka.ts" />
var MoreDakka;
(function (MoreDakka) {
    (function (Controllers) {
        (function (Recruitment) {
            var Character = (function () {
                function Character() {
                }
                return Character;
            })();

            var Application = (function () {
                function Application() {
                    this.character = null;
                }
                return Application;
            })();

            var ApplyController = (function () {
                function ApplyController($scope, $timeout, $http) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$timeout = $timeout;
                    this.$http = $http;
                    this.updateCharacter = function () {
                        var application = _this.$scope.application;
                        if (application.characterName == undefined || application.characterName == '' || application.realmName == undefined || application.realmName == '')
                            return;
                        console.log("Update Character");

                        _this.$http.jsonp("http://eu.battle.net/api/wow/character/" + application.realmName + "/" + application.characterName + "?jsonp=JSON_CALLBACK").success(function (data) {
                            return _this.$scope.application.character = {
                                characterName: data.name,
                                realmName: data.realm,
                                className: data.class,
                                race: data.race,
                                level: data.level,
                                thumbnail: 'http://eu.battle.net/static-render/eu/' + data.thumbnail
                            };
                        });
                    };
                    this.races = [];
                    this.classes = [];

                    $scope.application = new Application();

                    $scope.updateCharacter = function () {
                        if (_this.updateTimer != undefined) {
                            $timeout.cancel(_this.updateTimer);
                        }
                        _this.updateTimer = $timeout(function () {
                            return _this.updateCharacter();
                        }, 3000);
                    };

                    $http.jsonp('http://eu.battle.net/api/wow/data/character/races?jsonp=JSON_CALLBACK').success(function (data) {
                        _this.races = [];
                        for (var i in data.races) {
                            _this.races[data.races[i].id] = {
                                name: data.races[i].name,
                                side: data.races[i].side
                            };
                        }
                    });

                    $http.jsonp('http://eu.battle.net/api/wow/data/character/classes?jsonp=JSON_CALLBACK').success(function (data) {
                        _this.classes = [];
                        for (var i in data.classes) {
                            _this.classes[data.classes[i].id] = {
                                name: data.classes[i].name
                            };
                        }
                    });

                    $scope.getClass = function (classNo) {
                        if (_this.classes[classNo] == undefined)
                            return classNo;
                        return _this.classes[classNo].name;
                    };

                    $scope.getRace = function (race) {
                        if (_this.races[race] == undefined)
                            return race;
                        return _this.races[race].name;
                    };
                }
                return ApplyController;
            })();

            MoreDakka.moreDakka.controller('applyController', ApplyController);
        })(Controllers.Recruitment || (Controllers.Recruitment = {}));
        var Recruitment = Controllers.Recruitment;
    })(MoreDakka.Controllers || (MoreDakka.Controllers = {}));
    var Controllers = MoreDakka.Controllers;
})(MoreDakka || (MoreDakka = {}));
