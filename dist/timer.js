(function () {
    angular.module("timer-js", []);
}());
(function () {
    var TimerController = (function () {
        function TimerController($interval, $element, $scope, $transclude) {
            this.$interval = $interval;
            this.$scope = $scope;
            this.years = 0;
            this.months = 0;
            this.days = 0;
            this.hours = '00';
            this.minutes = '00';
            this.seconds = '00';
            this.interval = 0;
            $transclude($scope, function (clone) {
                $element.append(clone);
            });
        }
        TimerController.prototype.finish = function () { };
        TimerController.prototype.$onInit = function () {
            var _this = this;
            this.$scope.$watch(function () {
                return _this.time.interval;
            }, function (value) {
                if (_this.interval != value) {
                    _this.interval = value;
                    _this.start();
                }
            });
        };
        TimerController.prototype.start = function () {
            var _this = this;
            this.startTime = Date.now();
            this.endTime = this.startTime + this.interval * 1000;
            this.calc();
            var promise = this.$interval(function () {
                _this.interval--;
                _this.endTime = _this.startTime + _this.interval * 1000;
                _this.calc();
                if (_this.interval <= 0) {
                    _this.finish();
                    _this.$interval.cancel(promise);
                }
                else {
                    _this.time.interval = _this.interval;
                }
            }, 1000);
        };
        TimerController.prototype.numberFixedLength = function (input, length) {
            if (length === void 0) { length = 0; }
            var inputSting = String(input);
            var countZero = length - inputSting.length;
            if (countZero > 0) {
                return '0'.repeat(countZero) + inputSting;
            }
            return inputSting;
        };
        TimerController.prototype.calc = function () {
            var diff = moment(this.endTime).diff(moment(this.startTime)), duration = moment.duration(diff);
            this.years = Math.floor(duration.years());
            this.months = Math.floor(duration.months());
            this.days = Math.floor(duration.days());
            this.hours = this.numberFixedLength(Math.floor(duration.hours()), 2);
            this.minutes = this.numberFixedLength(Math.floor(duration.minutes()), 2);
            this.seconds = this.numberFixedLength(Math.floor(duration.seconds()), 2);
        };
        return TimerController;
    }());
    TimerController.$inject = ['$interval', '$element', '$scope', '$transclude'];
    var TimerComponent = (function () {
        function TimerComponent() {
            this.controller = TimerController;
            this.transclude = true;
            this.bindings = {
                time: '<',
                finish: '&'
            };
        }
        return TimerComponent;
    }());
    angular.module("timer-js").component('timer', new TimerComponent());
}());
