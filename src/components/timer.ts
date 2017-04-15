/// <reference path='../../node_modules/@types/angular/index.d.ts' />
/// <reference path='../../node_modules/@types/core-js/index.d.ts' />
/// <reference path='../../node_modules/moment/moment.d.ts' />

(function () {
    class TimerController implements ng.IComponentController {
        private time: { interval: number };
        private startTime: number;
        private endTime: number;
        private years: number = 0;
        private months: number = 0;
        private days: number = 0;
        private hours: string = '00';
        private minutes: string = '00';
        private seconds: string = '00';
        private interval: number = 0;

        constructor(private $interval: ng.ITimeoutService,
                    $element: ng.IRootElementService,
                    private $scope: ng.IScope,
                    $transclude: ng.ITranscludeFunction) {
            $transclude($scope, function (clone) {
                $element.append(clone);
            });

        }

        finish() {}
        $onInit() {
            this.$scope.$watch(() => {
                return this.time.interval;
            }, (value) => {
                if (this.interval != value) {
                    this.interval = value;
                    this.start();
                }
            });
        }

        start() {
            this.startTime = Date.now();
            this.endTime = this.startTime + this.interval * 1000;
            this.calc();
            let promise = this.$interval(() => {
                this.interval--;
                this.endTime = this.startTime + this.interval * 1000;
                this.calc();
                if (this.interval <= 0) {
                    this.finish();
                    this.$interval.cancel(promise);
                } else {
                    this.time.interval = this.interval;
                }
            }, 1000);
        }

        numberFixedLength(input: number, length: number = 0): string {
            let inputSting = String(input);
            let countZero = length - inputSting.length;
            if (countZero > 0) {
                return '0'.repeat(countZero) + inputSting;
            }
            return inputSting;
        }

        calc() {
            let diff = moment(this.endTime).diff(moment(this.startTime)),
                duration = moment.duration(diff);
            this.years = Math.floor(duration.years());
            this.months = Math.floor(duration.months());
            this.days = Math.floor(duration.days());
            this.hours = this.numberFixedLength(Math.floor(duration.hours()), 2);
            this.minutes = this.numberFixedLength(Math.floor(duration.minutes()), 2);
            this.seconds = this.numberFixedLength(Math.floor(duration.seconds()), 2);
        }

        static $inject = ['$interval', '$element', '$scope', '$transclude'];
    }

    class TimerComponent implements ng.IComponentOptions {
        public controller = TimerController;
        public transclude = true;
        public bindings = {
            time: '<',
            finish: '&'
        }
    }

    angular.module("timer-js").component('timer', new TimerComponent());
}());

