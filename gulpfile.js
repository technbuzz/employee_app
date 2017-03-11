var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync').create();

var dest = './app',
    src = './src';

gulp.task('sass', function(){
  sass('src/sass/main.scss',{
    style:'compressed',
    sourcemap: true
  })
  .on('error', sass.logError)
  // for file sourcemaps
  .pipe(sourcemaps.write('maps',{
    includeContent:true,
    sourceRoot:src
  }))
  .pipe(gulp.dest(dest+'/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('jade', function() {
  gulp.src(src + '/*.jade')
    .pipe(jade({
        pretty: true
    }).on('error', (err) => console.log(err)))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({
        stream: true
    }))
});


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: dest
    }
  })
});

gulp.task('watch', ['browserSync', 'sass', 'jade'], function() {
    gulp.watch(src + '/sass/**/*.scss', ['sass']);
    gulp.watch(src + '/**/*.jade', ['jade']);
    // gulp.watch(dest + '/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);