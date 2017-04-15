/// <reference path='../../node_modules/@types/angular/index.d.ts' />
/// <reference path='../../node_modules/@types/core-js/index.d.ts' />
/// <reference path='../../node_modules/moment/moment.d.ts' />

(function () {
    class TimerController implements ng.IComponentController {
        private time: number;
        private startTime: number;
        private endTime: number;
        private years: number = 0;
        private months: number = 0;
        private days: number = 0;
        private hours: number = 0;
        private minutes: number = 0;
        private seconds: number = 0;
        constructor(private $interval: ng.ITimeoutService,
                     $element: ng.IRootElementService,
                     $scope: ng.IScope,
                     $transclude: ng.ITranscludeFunction
        ) {
            $transclude($scope, function(clone) {
                $element.append(clone);
            });
        }
        finish() {}
        $onInit() {
            this.start();
        }
        start() {
            this.startTime = Date.now();
            this.endTime = this.startTime;
            this.calc();
            this.$interval(() => {
                this.time--;
                this.endTime = this.startTime + this.time * 1000;
                this.calc();
                if (this.time == 0) {
                    this.$interval.cancel();
                    this.finish();
                }
            }, 1000);
        }

        calc() {
            let diff = moment(this.endTime).diff(moment(this.startTime)),
                duration = moment.duration(diff);
            this.years = Math.floor(duration.years());
            this.months = Math.floor(duration.months());
            this.days = Math.floor(duration.days());
            this.hours = Math.floor(duration.hours());
            this.minutes = Math.floor(duration.minutes());
            this.seconds = Math.floor(duration.seconds());
        }

        static $inject = ['$interval', '$element', '$scope', '$transclude'];
    }

    class TimerComponent implements ng.IComponentOptions {
        public controller = TimerController;
        public transclude = true;
        public bindings = {
            time: '=',
            finish: '&'
        }
    }

    angular.module("timer-js").component('timer', new TimerComponent());
}());

