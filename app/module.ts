/// <reference path='../node_modules/@types/angular/index.d.ts' />
/// <reference path='../node_modules/@types/core-js/index.d.ts' />

(function () {
    angular.module('app', ['timer-js']);
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app'], {
            strictDi: true
        });
    });
}());
