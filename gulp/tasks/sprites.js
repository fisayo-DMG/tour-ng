var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'), 
del = require('del'),
svg2png = require('gulp-svg2png');

var config = {
    shape: {
        spacing: {
            padding: 1
        }
    },
    mode: {
        css: {
            variables: {
                replaceSvgWithPng: function() {
                    return function(sprite, render) {
                        return render(sprite).split('.svg').join('.png');
                    }
                }
            },
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

gulp.task('createPngCopy', gulp.series('createSprite', () => {
    return gulp.src('./app/temp/sprite/css/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('./app/temp/sprite/css'));
}));
//This task depends on createSprite task but it won't be included here
//instead it would be added appropiately in series in the icons tasks that runs
//the other tasks.
gulp.task('copySpriteGraphic', gulp.series('createPngCopy', () => {
    return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
        .pipe(gulp.dest('./app/assets/images/sprites'));
}));

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
gulp.task('icons', gulp.series('beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean'));
