import React, { Component, PropTypes } from 'react';
import api from '../api';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Cookies from 'cookies-js';

@connect(state => ({
  user: state.login.data,
  loading: state.login.loading,
  error: state.login.error
}))
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.any,
    loading: PropTypes.bool,
    error: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      submitted: false,
      credentials: {
        username: '',
        password: ''
      },
      errors: {
        username: 'This field is required.',
        password: 'This field is required.'
      }
    };
  }

  componentDidMount() {
    const { user } = this.props;

    if (user === null) {
      const keys = Object.keys(this.state.credentials);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (this.state.credentials[key].length < 1) {
          this.refs[key + 'Input'].focus();
          break;
        }
      }
    }
  }

  handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    
    let errorMsg = null;
    if (!value.length) {
      errorMsg = 'This field is required.';
    }

    let updateCredentials = {};
    updateCredentials[key] = {$set: value};

    let updateErrors = {};
    updateErrors[key] = {$set: errorMsg};

    this.setState(update(this.state, {
      credentials: updateCredentials,
      errors: updateErrors
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;

    for (let k in this.state.errors) {
      if (this.state.errors[k] !== null) {
        this.setState({ submitted: true });
        this.refs[k + 'Input'].focus();
        return;
      }
    }

    dispatch(api.actions.login({}, {body: JSON.stringify(this.state.credentials)}));
  }

  render() {
    const { user, error } = this.props;

    return (
      <div className="login-container">
        <div className="row">
          <div className="col-xs-12">
            <img src="/static/images/slb-logo.png" style={{height: '100px'}} />
          </div>
          <div className="col-xs-12">
            <div className="text-center m-b-md">
              <h3>Welcome to the<br/>Production Optimization Platform</h3>
              <small>PLEASE LOGIN BELOW</small>
            </div>
            <div className="hpanel">
              <div className="panel-body">
                <form action="#" id="login-form" onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + (this.state.submitted && this.state.errors.username !== null ? 'has-error' : '')}>
                    <label className="control-label" htmlFor="username">Username</label>
                    <input ref="usernameInput" onChange={this.handleChange.bind(this)} type="text" placeholder="john.doe" title="Please enter you username" required="" value={this.state.credentials.username} name="username" id="username" className="form-control" />
                    <span className="help-block small">If you are using corporate LDAP please prefix your username with a domain name, e.g. DIR\Myuser</span>
                    {this.props.error
                      ? <p className="help-block">{this.state.errors.username}</p>
                      : ''
                    }
                  </div>
                  <div className={'form-group ' + (this.state.submitted && this.state.errors.password !== null ? 'has-error' : '')}>
                    <label className="control-label" htmlFor="password">Password</label>
                    <input ref="passwordInput" onChange={this.handleChange.bind(this)} type="password" title="Please enter your password" placeholder="******" required="" value={this.state.credentials.password} name="password" id="password" className="form-control" />
                    {this.props.error
                      ? <p className="help-block">{this.state.errors.password}</p>
                      : ''
                    }
                  </div>
                  <div className="checkbox-styled checkbox-primary">
                    <input id="rememberme-checkbox" className="styled" type="checkbox" checked />
                    <label htmlFor="rememberme-checkbox">Remember login</label>
                  </div>
                  <button className="btn btn-primary btn-block" onClick={this.handleSubmit.bind(this)}>Login</button>
                  {this.props.error !== null
                    ? <p className="text-danger" style={{marginTop: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px'}}>{this.props.error}</p>
                    : this.props.loading ? <p style={{marginTop: '20px', textAlign:'center'}}><i className="fa fa-spinner fa-pulse fa-2x"></i></p> : ''
                  }
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <strong>Production Optimization Platform</strong> - Portal <br/> &#169; 2016 Schlumberger
          </div>
        </div>
      </div>
    );
  }
}