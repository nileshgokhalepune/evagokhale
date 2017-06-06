var gulp = require('gulp');
var gulpTypescript = require('gulp-typescript');
var clean = require('gulp-clean');
var project = gulpTypescript.createProject('tsconfig.json');
var replace = require('gulp-replace');

/**Clean the release folder */
gulp.task('clean', function() {
      return gulp.src(['release'])
    .pipe(clean());
});

/**Compile the project */
gulp.task('compile', ['clean'], function() {
  return project.src()
    .pipe(project())
    .pipe(gulp.dest('release/app'));
});

/**We need to replace the dev environment in environment.js to prod. 
 * which will be used by the angular app to determine whether to run in dev or prod mode.
 * This is literally a replace of value dev to prod and writing the file again to the destination folder.
 * we need to clean the file first cause the dest function cannot overwrite the file.
 */
gulp.task('changeEnvToProd', ['compile'], function() {
  return gulp.src('release/app/environment.js')
    .pipe(replace('dev', 'prod'))
    .pipe(clean('release/app/environment.js'))
    .pipe(gulp.dest('release/app'));
});

/**Copy all required node_modules to the release folder */
gulp.task('nodemodules', ['clean', 'compile'], function() {
  return gulp.src([
    'node_modules/@angular/**/*.js',
    'node_modules/core-js/**/*.js',
    'node_modules/systemjs/**/*.js',
    'node_modules/zone.js/**/*.js',
    'node_modules/rxjs/**/*.js',
    'node_modules/@ingramcontent/**/*.*',
    'node_modules/reflect-metadata/**/*.js',
    'node_modules/bootstrap/**/*',
    'node_modules/wijmo/**/*.js',
    'node_modules/ng2-toasty/**/*.js',
    'node_modules/ng2-toasty/**/*.css',
    'node_modules/moment/**/*.js',
    'node_modules/es6-promise/**/*.js',
    'node_modules/es6-shim/**/*.js'
  ], {
    base: 'node_modules'
  }).pipe(gulp.dest('release/node_modules/'));
});

/**Copy all html files to release/app folder*/
gulp.task('html', ['clean', 'nodemodules'], function() {
  return gulp.src('app/**/*.html', {
    base: 'app'
  }).pipe(gulp.dest('release/app'));
});

/**Copy all assets to release/assets folder */
gulp.task('styles', ['clean', 'nodemodules'], function() {
  return gulp.src('assets/**/*.*', {
    base: 'assets'
  }).pipe(gulp.dest('release/assets'));
});

gulp.task('json', ['clean', 'nodemodules'], function() {
  return gulp.src(['dev.json', 'qa.json', 'prod.json'])
    .pipe(gulp.dest('release/'));
});

gulp.task('other', ['clean', 'nodemodules'], function() {
  return gulp.src(['index.html', 'systemjs.config.js'])
    .pipe(gulp.dest('release/'));
})

gulp.task('default', ['clean', 'compile', 'changeEnvToProd', 'nodemodules', 'html', 'styles', 'json', 'other']);