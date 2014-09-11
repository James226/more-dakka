/// <reference path="../typings/angularjs/angular.d.ts"/>

module MoreDakka {
    export var moreDakka: ng.IModule;

    moreDakka = angular.module('moreDakka', ['ngRoute', 'ngAnimate'])
        .run(($rootScope, $route) => {

        });
}