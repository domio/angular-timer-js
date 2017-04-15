Example Usage:

```js
angular.module('app', ['timer-js']);
```

```html
<timer time="$ctrl.time" 
       finish="$ctrl.finish()">
       {{ $ctrl.years }} {{ $ctrl.months }} {{ $ctrl.days }} {{ $ctrl.hours }}:{{ $ctrl.minutes }}:{{ $ctrl.seconds }}
</timer>
```
