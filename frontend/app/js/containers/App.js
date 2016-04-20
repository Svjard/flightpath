import React, { Component, PropTypes } from 'react';

import { Header } from '../components';

export default class App extends Component {
  static propTypes = {
    location: PropTypes.object
  };

  constructor() {
    super(arguments);
  }

  render() {
    return (
      <div>
        <Header />
        <div id="wrapper">
          <div id="primary-content" className="content animate-panel with-padding">
          { this.props.children }
          </div>
        </div>
      </div>
    );
  }
};
