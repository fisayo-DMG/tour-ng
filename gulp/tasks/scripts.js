var gulp = require('gulp'),
webpack = require('webpack');
require('./modernizr');

gulp.task('scripts', gulp.series('modernizr', (callback) => {
    webpack(require('../../webpack.config.js'), (err, stats) => {
        if(err) {
            console.log(err.toString());
        }
        console.log(stats.toString());
        callback();
    });
}));