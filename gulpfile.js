var browserify = require('browserify')
  , gulp = require('gulp')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')
  , uglify = require('gulp-uglify')
  , sourcemaps = require('gulp-sourcemaps')
  , watch = require('gulp-watch')
  , batch = require('gulp-batch')
  , concat = require('gulp-concat')

gulp.task('build-js', function() {
  var bundler = browserify({
    entries: ['./src/js/start.js'],
    debug: true
  })

  return bundler
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./client/'))
})

gulp.task('watch-js', function () {
  watch('src/js/**', batch(function () {
      gulp.start('build-js')
  }))
})

gulp.task('build-css', function () {
  return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.min.css',
      './node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      './src/css/main.css'])
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./client/'));
})

gulp.task('watch-css', function () {
  watch('src/css/**', batch(function () {
      gulp.start('build-css')
  }))
})