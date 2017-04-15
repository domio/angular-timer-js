const
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ts = require('gulp-typescript'),
    component = ts.createProject("tsconfig.json"),
    app = ts.createProject("app.tsconfig.json"),
    watch = require('gulp-watch');

gulp.task('watch:js', function () {
    watch(['src/**/*.ts', 'app/**/*.ts'], {usePolling: true, alwaysStat: true}, function () {
        gulp.start('scripts');
    });
});


gulp.task('scripts:app', function (cb) {
    app.src()
        .pipe(app())
        .js
        .pipe(concat('app.js'))
        .pipe(gulp.dest('demo/js'))
        .on('end', cb);
});

gulp.task('scripts:lib', function (cb) {
    gulp.src(['node_modules/angular/angular.min.js', 'node_modules/moment/min/moment.min.js'])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('demo/js'))
        .on('end', cb);
});

gulp.task('scripts:component', function (cb) {
    component.src()
        .pipe(component())
        .js
        .pipe(concat('timer.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(concat('timer.min.js'))
        .pipe(gulp.dest('dist'))
        .on('end', cb);
});
gulp.task('scripts', ['scripts:app', 'scripts:component', 'scripts:lib']);
