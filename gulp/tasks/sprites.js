var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'), 
del = require('del');

var config = {
    mode: {
        css: {
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

gulp.task('beginClean', () => {
    return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

// gulp.task('randomStuff', () => {
//     console.log('random stuff');
// });

//beginClean would normally be a dependency to this task
// but there is no need to add it here since we are already
// adding it to the list of icons tasks at the bottom that woul run in series
gulp.task('createSprite', () => {
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/temp/sprite/'));
});

//This task depends on createSprite task but it won't be included here
//instead it would be added appropiately in series in the icons tasks that runs
//the other tasks.
gulp.task('copySpriteGraphic', () => {
    return gulp.src('./app/temp/sprite/css/**/*.svg')
        .pipe(gulp.dest('./app/assets/images/sprites'));
});

// gulp.task('copySpriteCSS', gulp.series('createSprite', () => {
//     return gulp.src('./app/temp/sprite/css/*.css')
//         .pipe(rename('_sprite.css'))
//         .pipe(gulp.dest('./app/assets/styles/modules'));
// }));

gulp.task('copySpriteCSS', () => {
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', () => {
    return del('./app/temp/sprite');
});
gulp.task('icons', gulp.series('beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean'));
