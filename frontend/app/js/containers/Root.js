import React, { Component, PropTypes } from 'react';
import { Redirect, Router, Route, browserHistory } from 'react-router';
import Cookies from 'cookies-js';

import App from './App';
import { Home, Login } from '../components';

export default class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  requireAuth(nextState, transition) {
    if (!Cookies.get('x-bonvoyage-auth')) {
      transition('/login');
    }
  }

  render() {
    const processENV = process.env.NODE_ENV;
    const { history } = this.props;

    return (
      <Router history={history}>
        <Redirect from="/" to="/home" />
        <Route path="/" component={App} onEnter={this.requireAuth.bind(this)}>
          <Route path="/home" component={Home} />
        </Route>
        <Route path="/login" component={Login} />
      </Router>
    );
  }
};
