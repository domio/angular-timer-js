Example Usage:

```js
angular.module('app', ['timer-js']);
angular.module('app').component('app', {
    controller: function() {
      this.time = {
        interval: 10 
      };
      this.finish = function() {
        this.time = {
            interval: 10
        };
      }
    }
});
```

```html
<timer time="$ctrl.time" 
       finish="$ctrl.finish()">
       {{ $ctrl.years }} {{ $ctrl.months }} {{ $ctrl.days }} {{ $ctrl.hours }}:{{ $ctrl.minutes }}:{{ $ctrl.seconds }}
</timer>
```


