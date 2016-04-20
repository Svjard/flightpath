'use strict';

import gulp   from 'gulp';
import config from '../config';

gulp.task('copyExternalCss', function() {

  return gulp.src([
  	'./node_modules/aocomponents/dist/*.css*',
  	config.sourceDir + 'styles/c3.min.css'
  ])
  .pipe(gulp.dest(config.buildDir + 'css/'));

});