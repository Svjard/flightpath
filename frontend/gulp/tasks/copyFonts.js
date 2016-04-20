'use strict';
import gutil  from 'gulp-util';
import gulp   from 'gulp';
import config from '../config';

gulp.task('copyFonts', function() {
  gutil.log(config.sourceDir);
  return gulp.src([config.sourceDir + '/styles/fonts/**/*'])
    .pipe(gulp.dest(config.buildDir + 'css/fonts/'));

});