const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');



// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Replacing sass/scss with css format and uploading in dist, also minification
gulp.task('styles', function () {
    return gulp.src('src/sass/**/*.+(scss|sass)')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(browserSync.stream())
        .pipe(gulp.dest('dist/css'))

});

gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', gulp.parallel('html'));
});

//HTML minification and uploading in dits
gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'));
});

//Uploading files in dist
gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'));
});
gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});
gulp.task('mailer', function () {
    return gulp.src('src/mailer/**/*')
        .pipe(gulp.dest('dist/mailer'));
});

//Image minification and uploading in dist
gulp.task('icons', function () {
    return gulp.src('src/icons/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/icons'));
});
gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});


gulp.task('default', gulp.parallel('watch', 'browser-sync', 'styles', 'html', 'scripts', 'fonts', 'icons', 'mailer', 'images'));