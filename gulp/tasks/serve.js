const gulp = require('gulp'),
    browserSync = require('browser-sync').get('serve');


gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./demo"
        }
    });
    gulp.start('watch:js');
});
