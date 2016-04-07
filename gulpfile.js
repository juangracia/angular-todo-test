// Importamos gulp
var gulp = require('gulp');

// Importamos los plugins necesarios
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

// Link task
gulp.task('lint', function() {
    return gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('connect', function() {
  connect.server({
    port: 9500,
    livereload: true
  });
});

// Sass task
gulp.task('sass', function() {
    return gulp.src(['app/**/*.scss', '!app/sass/_*.scss'])
        .pipe(concat('angularProject.scss'))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

// Concat JS task
gulp.task('scripts', function() {
    return gulp.src(['app/**/*.module.js', 'app/**/*.js'])
        .pipe(concat('angularProject.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

// Recargar el servidor si hay cambios en el HTML
gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe(connect.reload());
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['lint', 'scripts']);
    gulp.watch('app/**/*.scss', ['sass']);
    gulp.watch(['*.html', 'app/**/*.html'], ['html']);
    gulp.watch('dist/**/*.*', ['livereload']);
});

//livereload
gulp.task('livereload', function() {
  gulp.src('dist/**/*.*')
    .pipe(connect.reload());
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts']);

gulp.task('serve', ['default', 'connect', 'watch']);
