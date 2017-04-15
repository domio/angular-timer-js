const gulp = require('gulp');
require('browser-sync').create('serve');
require('./gulp');

gulp.task('build', ['scripts', 'styles']);
gulp.task('watch', ['watch:js', 'watch:styles']);

