import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import api from '../api';
import { connect } from 'react-redux';

@connect(state => ({
  user: state.user.data
}))
export default class Home extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  constructor() {
    super(...arguments);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    console.log('props', this.props);

    return (
      <div className="row">
        <div className="col-xs-12">
          
        </div>
      </div>
    );
  }
};

