var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');


var archivosJs = [
  'js/plugin.js',
  // 'js/router.js',
  'js/script.js'
]

gulp.task('sass', function() {
  gulp.src('scss/app.scss')
    .pipe(autoprefixer())
    .pipe(sass({
      includePaths: ['scss']
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('js', function(){
    gulp.src(archivosJs)
      .pipe(concat('script.js'))
      .pipe(gulp.dest('app/js'))
      .pipe(reload({stream: true}))
});

gulp.task('serve', ['sass'], function(){
  browserSync.init(["app/css/*.css", "app/js/*.js","app/*.html"], {
    server: {
      baseDir: 'app'
    }
  })
});

gulp.task('watch', [ 'sass', 'serve', 'js' ], function(){
    gulp.watch(['scss/*.scss'], ['sass']);
    gulp.watch(['js/*.js'], ['js']);
});


gulp.task('default', ['watch']);
