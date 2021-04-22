const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const minifycss = require('gulp-minify-css');

const DIR = {
	jsFormat: ['dev/js/*.js','pro/js/'],
    cssFormat: ["dev/scss/*scss","pro/css"],
}

gulp.task('jsFormat', () =>
    gulp.src(DIR.jsFormat[0])
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(DIR.jsFormat[1]))
);

gulp.task('cssFormat', () =>
	gulp.src(DIR.cssFormat[0])
	.pipe(sass({
		outputStyle: 'expanded' // expanded, compact, compressed, Nested
	}))
    .pipe(minifycss())
	.pipe(rename({
        suffix: '.min'
    }))
	.pipe(gulp.dest(DIR.cssFormat[1]))
);

gulp.task('default', () => {
    gulp.watch(DIR.jsFormat[0], gulp.series('jsFormat'));
    gulp.watch(DIR.cssFormat[0], gulp.series('cssFormat'));
});