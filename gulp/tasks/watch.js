var gulp = require('gulp');
var watch = require('gulp-watch'),
browserSync = require('browser-sync').create();


gulp.task('watch', async () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });
    // watch('./app/index.html', browserSync.reload());
    watch('./app/index.html').on('change', browserSync.reload);
    watch('./app/assets/styles/**/*.css', gulp.series('cssInject'));
});

gulp.task('cssInject', gulp.series('styles', async () => {
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
}));