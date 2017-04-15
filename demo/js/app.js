(function () {
    angular.module("timer-js", []);
}());
(function () {
    var TimerController = (function () {
        function TimerController($interval, $element, $scope, $transclude) {
            this.$interval = $interval;
            this.years = 0;
            this.months = 0;
            this.days = 0;
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            $transclude($scope, function (clone) {
                $element.append(clone);
            });
        }
        TimerController.prototype.finish = function () { };
        TimerController.prototype.$onInit = function () {
            this.start();
        };
        TimerController.prototype.start = function () {
            var _this = this;
            this.startTime = Date.now();
            this.endTime = this.startTime;
            this.calc();
            this.$interval(function () {
                _this.time--;
                _this.endTime = _this.startTime + _this.time * 1000;
                _this.calc();
                if (_this.time == 0) {
                    _this.$interval.cancel();
                    _this.finish();
                }
            }, 1000);
        };
        TimerController.prototype.calc = function () {
            var diff = moment(this.endTime).diff(moment(this.startTime)), duration = moment.duration(diff);
            this.years = Math.floor(duration.years());
            this.months = Math.floor(duration.months());
            this.days = Math.floor(duration.days());
            this.hours = Math.floor(duration.hours());
            this.minutes = Math.floor(duration.minutes());
            this.seconds = Math.floor(duration.seconds());
        };
        return TimerController;
    }());
    TimerController.$inject = ['$interval', '$element', '$scope', '$transclude'];
    var TimerComponent = (function () {
        function TimerComponent() {
            this.controller = TimerController;
            this.transclude = true;
            this.bindings = {
                time: '=',
                finish: '&'
            };
        }
        return TimerComponent;
    }());
    angular.module("timer-js").component('timer', new TimerComponent());
}());
(function () {
    angular.module('app', ['timer-js']);
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app'], {
            strictDi: true
        });
    });
}());
(function () {
    var AppController = (function () {
        function AppController() {
            this.i = 0;
        }
        AppController.prototype.$onInit = function () {
            this.time = 10;
        };
        AppController.prototype.finish = function () {
            this.i++;
            this.time = 50 * this.i;
        };
        return AppController;
    }());
    var AppComponent = (function () {
        function AppComponent() {
            this.template = "<timer time=\"$ctrl.time\" \nfinish=\"$ctrl.finish()\">{{ $ctrl.days }} {{ $ctrl.hours }}:{{ $ctrl.minutes }}:{{ $ctrl.seconds }}</timer>";
            this.controller = AppController;
        }
        return AppComponent;
    }());
    angular.module('app').component('appComponent', new AppComponent());
}());
