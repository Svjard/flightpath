'use strict';

import gulp        from 'gulp';
import nodemon		 from 'gulp-nodemon';

gulp.task('nodemon', function() {

  nodemon({
    script: 'server.js',
    env: { 'NODE_ENV': 'development' }
  }).on('restart', function () {
    console.log('server restarted!')
  });

});