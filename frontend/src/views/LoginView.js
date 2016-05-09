import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reactMixin from 'react-mixin';
import * as actionCreators from '../actions';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class LoginView extends React.Component {
  constructor(props, context) {
    super(props, context);

    const redirectRoute = this.props.location.query.next || '/login';
     this.state = {
      submitted: false,
      credentials: {
        email: '',
        password: ''
      },
      errors: {
        email: 'This field is required.',
        password: 'This field is required.'
      },
      redirectTo: redirectRoute
    };

    this.layers = [];
    this.objects = [];
    this.textures = [];

    this.ext = '';
    
    this.d = 0;
    this.p = 400;
    this.worldXAngle = 0;
    this.worldYAngle = 0;
    this.computedWeights = [];

    this.update = this.update.bind(this);
    this.createCloud = this.createCloud.bind(this);

    // event handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let ext = document.location.port !== '3000' ? '/static' : '';
    if (this.ext !== ext) {
      this.ext = ext;
      this.setState(this.state);
    }

    var keys = Object.keys(this.state.credentials);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (this.state.credentials[key].length < 1) {
        this.refs[key + 'Input'].focus();
        break;
      }
    }

    this.world = document.getElementById('world');
    this.viewport = document.getElementById('viewport');

    this.viewport.style.webkitPerspective = this.p;
    this.viewport.style.MozPerspective = this.p + 'px';
    this.viewport.style.oPerspective = this.p;
    this.viewport.style.perspective = this.p;

    this.objects = [];
    if (this.world.hasChildNodes()) {
      while (this.world.childNodes.length >= 1) {
        this.world.removeChild(this.world.firstChild);       
      } 
    }
    
    for (let j = 0; j < 5; j++) {
      this.objects.push(this.createCloud());
    }

    this.update();
  }

  update() {
    for (let j = 0; j < this.layers.length; j++) {
      let layer = this.layers[j];
      layer.data.a += layer.data.speed;
      let t = 'translateX( ' + layer.data.x + 'px ) translateY( ' + layer.data.y + 'px ) translateZ( ' + layer.data.z + 'px ) rotateY( ' + ( -this.worldYAngle ) + 'deg ) rotateX( ' + ( -this.worldXAngle ) + 'deg ) rotateZ( ' + layer.data.a + 'deg ) scale( ' + layer.data.s + ')';
      layer.style.webkitTransform =
        layer.style.MozTransform =
        layer.style.oTransform =
        layer.style.transform = t;
    }
    
    requestAnimationFrame(this.update);
  }

  createCloud() {
    let div = document.createElement('div');
    div.className = 'cloudBase';

    const x = 256 - (Math.random() * 512);
    const y = 256 - (Math.random() * 512);
    const z = 256 - (Math.random() * 512);
    const t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px )';
    div.style.webkitTransform = 
    div.style.MozTransform = 
    div.style.oTransform =
    div.style.transform = t;
    this.world.appendChild( div );
    
    for (let j = 0; j < 5 + Math.round(Math.random() * 10); j++) {
      let cloud = document.createElement('img');
      cloud.style.opacity = 0;

      const src = this.ext + '/images/cloud.png';
      ((img) => {
        img.addEventListener('load', () => {
          img.style.opacity = .8;
        });
      })(cloud);

      cloud.setAttribute( 'src', src );
      cloud.className = 'cloudLayer';
      
      let x = 256 - (Math.random() * 512);
      let y = 256 - (Math.random() * 512);
      let z = 100 - (Math.random() * 200);
      let a = Math.random() * 360;
      let s = .25 + Math.random();
      x *= .2; y *= .2;
      cloud.data = { 
        x: x,
        y: y,
        z: z,
        a: a,
        s: s,
        speed: .1 * Math.random()
      };
      
      let t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px ) rotateZ( ' + a + 'deg ) scale( ' + s + ' )';
      cloud.style.webkitTransform = 
        cloud.style.MozTransform = 
        cloud.style.oTransform = 
        cloud.style.transform = t;
    
      div.appendChild(cloud);
      this.layers.push(cloud);
    }
    
    return div;
  }

  handleChange(event) {
    var stateChange = this.state;
    var key = event.target.name;
    stateChange.credentials[key] = event.target.value;
    
    if (!stateChange.credentials[key].length) {
      stateChange.errors[key] = 'This field is required.';
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

    var keys = Object.keys(this.state.credentials),
        resetState = {};
    for (var i = 0; i < keys.length; i++) {
      resetState[keys[i]] = '';
    }

    this.props.actions.loginUser(this.state.credentials.email, this.state.credentials.password, this.state.redirectTo);

    this.setState(resetState);
  }

  render() {
    return (
      <div id="page-container" className="page-container">
        <div id="viewport">
          <div id="world"></div>
          <div className="login">
            <div className="login-brand bg-inverse text-white">
              <img src={this.ext + '/images/logo_inverse.png'} height="36" className="pull-right" /> Flight Path Login
            </div>
            <div className="login-content">
              <div className="text-center m-t-0 m-b-20">Please sign in to your account below.</div>
              { this.props.isAuthenticating ?  <i class="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i> :
              <form role="form" name="login_form" className="form-input-flat">
                <div className={'form-group ' + (this.state.submitted && (this.state.errors || {}).email ? 'has-error' : '')}>
                  <input ref="emailInput" name="email" onChange={this.handleChange} type="text" className="form-control input-lg" placeholder="Email" />
                  <small className="text-muted form-error">{(this.state.submitted && (this.state.errors || {}).email) || ''}</small>
                </div>
                <div className={'form-group ' + (this.state.submitted && (this.state.errors || {}).password ? 'has-error' : '')}>
                  <input ref="passwordInput" name="password" onChange={this.handleChange} type="password" className="form-control input-lg" placeholder="Password" />
                  <small className="text-muted form-error">{(this.state.submitted && (this.state.errors || {}).password) || ''}</small>
                </div>
                <div className="row m-b-20">
                  <div className="col-md-12">
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-lime btn-lg btn-block">Sign in to your account</button>
                  </div>
                </div>
                <div className="text-center">
                  New here? <a href="/register" className="text-muted">Create a new account</a>
                </div>
              </form>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

reactMixin(LoginView.prototype, LinkedStateMixin);

const mapStateToProps = (state) => ({
  isAuthenticating   : state.auth.isAuthenticating,
  statusText         : state.auth.statusText
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);