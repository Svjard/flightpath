'use strict';

import gulp       from 'gulp';
import {jsdom}    from 'jsdom';
import {argv}     from 'yargs';
import istanbul   from 'gulp-babel-istanbul';
import mocha      from 'gulp-mocha';
import config     from '../config';

gulp.task('pre-test', () => {
  return gulp.src([config.scripts.src, '!app/js/**/__tests__/**'])
    // Covering files
    .pipe(istanbul({
      coverageVariable: '__IRIS_TEST_COVERAGE__',
      includeUntested: true,
      exclude: /node_modules|__tests__|^build|gulp|testHelpers/
    }))
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {

  let files;

  // Allow specification of a single test file
  if ( argv.f || argv.file ) {
    let singleFile = argv.f || argv.file;

    // Allow omission of directory and/or extension
    if ( singleFile.indexOf('__tests__/') === -1 ) { singleFile = `__tests__/${singleFile}`; }
    if ( singleFile.indexOf('.test.js') === -1 ) { singleFile += '.test.js'; }

    // Include top-level helper even when running specific tests
    files = ['./helper.js', singleFile];
  } else {
    // Default to all test files
    files = ['./helper.js', config.testFiles];
  }

  // Ensure that all window/DOM related properties
  // are available to all tests
  global.document = jsdom('<!DOCTYPE html><html><body></body></html>');
  global.window = document.defaultView;
  global.location = { href: '' };
  global.navigator = {};
  global.navigator.userAgent = 'jsdom';
  global.navigator.appVersion = '';

  // Ensure that 'should' and 'sinon' library methods will be
  // available to all tests
  global.Should = require('should');
  global.sinon = require('sinon');

  return gulp.src(files)
    .pipe(mocha({
      reporter: 'teamcity'
    }))
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports({
      dir: '__coverage__/',
      reporters: [ 'lcov', 'json', 'text', 'text-summary', 'teamcity', 'html' ],
      reportOpts: { dir: '__coverage__/' },
      coverageVariable: '__IRIS_TEST_COVERAGE__'
    }))
    // Enforce a coverage of at least 90%
    //.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});