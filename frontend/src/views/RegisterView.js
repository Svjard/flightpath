import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reactMixin from 'react-mixin';
import * as actionCreators from '../actions';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

let countries = require('data/countries.json');

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class RegisterView extends React.Component {
  constructor(props, context) {
    super(props, context);

    const redirectRoute = this.props.location.query.next || '/register';
     this.state = {
      submitted: false,
      credentials: {
        email: '',
        username: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: '',
        company_name: '',
        country: 'US'
      },
      errors: {
        email: 'This field is required.',
        username: 'This field is required.',
        password: 'This field is required.',
        confirm_password: 'This field is required.'
      },
      redirectTo: redirectRoute
    };

    // event handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var keys = Object.keys(this.state.credentials);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (this.state.credentials[key].length < 1) {
        this.refs[key + 'Input'].focus();
        break;
      }
    }
  }

  handleChange(event) {
    var stateChange = this.state;
    var key = event.target.name;
    stateChange.credentials[key] = event.target.value;
    
    if (!stateChange.credentials[key].length) {
      stateChange.errors[key] = 'This field is required.';
    }
    else if (key === 'email' && stateChange.credentials[key].match(emailRegex) === null) {
      stateChange.errors[key] = 'A valid email address must be entered.';
    }
    else if ((key === 'password' || this.state.confirm_password.length > 0) &&
      stateChange.credentials[key] !== this.state.confirm_password) {
      stateChange.errors[key] = 'Passwords must match.';
    }
    else if ((key === 'confirm_password' || this.state.password.length > 0) &&
      stateChange.credentials[key] !== this.state.password) {
      stateChange.errors[key] = 'Passwords must match.';
    }
    else {
      stateChange.errors[key] = null;
    }

    this.setState(stateChange);
  }

  handleSubmit(event) {
    event.preventDefault();
    
    for (let k in this.state.errors) {
      if (this.state.errors[k] !== null) {
        this.setState({ submitted: true });
        this.refs[k + 'Input'].focus();
        return;
      }
    }

    if (!this.refs.termsAndConditions.checked) {
      this.setState({ submitted: true, errors: _.merge(this.state.errors || {}, { termsAndConditions: true }) });
      this.refs['termsAndConditions'].focus();
      return;
    }

    var keys = Object.keys(this.state.credentials),
        resetState = {};
    for (var i = 0; i < keys.length; i++) {
      resetState[keys[i]] = '';
    }
    resetState['termsAndConditions'] = '';

    this.props.actions.loginUser(this.state.credentials.email, this.state.credentials.password, this.state.redirectTo);

    this.setState(resetState);
  }

  render() {
    return (
      <div id="page-container" className="page-container">
        <div className="register">
          <div className="register-brand bg-inverse text-white">
            <img src='/images/logo_inverse.png' height="36" className="pull-right" /> Flight Path Registration
          </div>
          <div className="register-content">
            <div className="text-center m-t-0 m-b-20">Please fill-in the information below to register.</div>
            { this.props.isAuthenticating ?  <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i> :
            <form role="form" name="register_form" className="form-input-flat">
              <div className="row row-space-14">
                <div className="col-md-6 m-b-15">
                  <input ref="first_nameInput" name="first_name" onChange={this.handleChange} type="text" className="form-control input-lg" placeholder="First Name" />
                  <small className="text-muted">(Optional)</small>
                </div>
                <div className="col-md-6 m-b-15">
                  <input ref="last_nameInput" name="last_name" onChange={this.handleChange} type="text" className="form-control input-lg" placeholder="Last Name" />
                  <small className="text-muted">(Optional)</small>
                </div>
              </div>
              <div className="form-group">
                <select ref="countryInput" name="country" onChange={this.handleChange} className="form-control" value={this.state.credentials.country}>
                {countries.map((val, i) => {
                  return (<option value={val.code}>{val.name}</option>);
                })}
                </select>
              </div>
              <div className={'form-group ' + (this.state.submitted && (this.state.errors || {}).email ? 'has-error' : '')}>
                <input ref="emailInput" name="email" onChange={this.handleChange} type="text" className="form-control input-lg" placeholder="Email" />
                <small className="text-muted form-error">{(this.state.submitted && (this.state.errors || {}).email) || ''}</small>
              </div>
              <div className={'form-group ' + (this.state.submitted && (this.state.errors || {}).username ? 'has-error' : '')}>
                <input ref="usernameInput" name="username" onChange={this.handleChange} type="text" className="form-control input-lg" placeholder="Username" />
                <small className="text-muted form-error">{(this.state.submitted && (this.state.errors || {}).username) || ''}</small>
              </div>
              <div className={'form-group ' + (this.state.submitted && (this.state.errors || {}).password ? 'has-error' : '')}>
                <input ref="passwordInput" name="password" onChange={this.handleChange} type="password" className="form-control input-lg" placeholder="Password" />
                <small className="text-muted form-error">{(this.state.submitted && (this.state.errors || {}).password) || ''}</small>
              </div>
              <div className={'form-group ' + (this.state.submitted && (this.state.errors || {}).confirm_password ? 'has-error' : '')}>
                <input ref="confirm_passwordInput" name="confirm_password" onChange={this.handleChange} type="password" className="form-control input-lg" placeholder="Confirm Password" />
                <small className="text-muted form-error">{(this.state.submitted && (this.state.errors || {}).confirm_password) || ''}</small>
              </div>
              <div className={'checkbox m-b-15 ' + (this.state.submitted && (this.state.errors || {}).termsAndConditions ? 'has-error' : '')}>
                <div class="checkbox">
                  <label>
                    <input type="checkbox" ref="termsAndConditions" /> By creating an account, you agree to our <a href="#" className="text-muted">Terms and condition</a> and <a href="#" className="text-muted">Privacy Policy</a>.
                  </label>
                  <small className="text-muted form-error">{(this.state.submitted && (this.state.errors || {}).termsAndConditions) ? 'Must accept the terms and conditions to register.' : ''}</small>
                </div>
              </div>
              <div className="row m-b-20">
                <div className="col-md-12">
                  <button type="submit" onClick={this.handleSubmit} className="btn btn-lime btn-lg btn-block">Register</button>
                </div>
              </div>
              <div className="text-center">
                Already a member? <Link to="/login" className="text-muted">Login with your account</Link>
              </div>
            </form>
            }
          </div>
        </div>
      </div>
    );
  }
}

reactMixin(RegisterView.prototype, LinkedStateMixin);

const mapStateToProps = (state) => ({
  isAuthenticating   : state.auth.isAuthenticating,
  statusText         : state.auth.statusText
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);