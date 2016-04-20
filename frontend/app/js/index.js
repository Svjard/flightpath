'use strict';

import React from 'react';
import Root from './containers/Root';
import { browserHistory  } from 'react-router'
import ReactDOM from 'react-dom';
import attachFastClick from 'fastclick';
import ga              from 'react-ga';
import constants       from './constants';

ga.initialize(constants.GA_TRACKING_ID);

function logPageView() {
  ga.pageview(this.state.location.pathname);
}

ReactDOM.render(
  <Root history={browserHistory} />,
  document.getElementById('app')
);

attachFastClick(document.body);
