var gulp = require('gulp');
var watch = require('gulp-watch'),
browserSync = require('browser-sync').create();
require('./scripts');


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
    watch('./app/assets/scripts/**/*.js', gulp.series('scriptsRefresh'));
});

gulp.task('cssInject', gulp.series('styles', async () => {
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
}));

gulp.task('scriptsRefresh', gulp.series('scripts', () => {
    browserSync.reload();
}));