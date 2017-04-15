/// <reference path='../../node_modules/@types/angular/index.d.ts' />
/// <reference path='../../node_modules/@types/core-js/index.d.ts' />
(function () {
    class AppController implements ng.IComponentController {
        private time: {interval: number};
        private i: number = 0;

        $onInit() {
            this.time = {
                interval: 2
            };
        }

        finish() {
            this.i++;
            this.time.interval = 10 * this.i;
        }
    }
    class AppComponent implements ng.IComponentOptions {
        public template: string = `<timer time="$ctrl.time" 
finish="$ctrl.finish()">{{ $ctrl.days }} {{ $ctrl.hours }}:{{ $ctrl.minutes }}:{{ $ctrl.seconds }}</timer>`;
        public controller = AppController;
    }
    angular.module('app').component('appComponent', new AppComponent());
}());
