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
        private hours: string = '00';
        private minutes: string = '00';
        private seconds: string = '00';

        constructor(private $interval: ng.ITimeoutService,
                    $element: ng.IRootElementService,
                    $scope: ng.IScope,
                    $transclude: ng.ITranscludeFunction) {
            $transclude($scope, function (clone) {
                $element.append(clone);
            });
        }

        finish() {

        }
        $onChanges() {
            this.start();
        }
        start() {
            this.startTime = Date.now();
            this.endTime = this.startTime + this.time * 1000;
            this.calc();
            let promise = this.$interval(() => {
                this.time--;
                this.endTime = this.startTime + this.time * 1000;
                this.calc();
                if (this.time <= 0) {
                    this.$interval.cancel(promise);
                    this.finish();
                    return;
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

