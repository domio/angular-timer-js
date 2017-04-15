const gulp    = require('gulp'),
    sass    = require('gulp-sass');

gulp.task('styles', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(
            sass({
                includePaths: [
                    'node_modules'
                ],
                outputStyle: 'compressed'
            }).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});
