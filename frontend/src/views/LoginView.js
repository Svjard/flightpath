import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class LoginView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.layers = [];
    this.objects = [];
    this.textures = [];
    
    this.d = 0;
    this.p = 400;
    this.worldXAngle = 0;
    this.worldYAngle = 0;
    this.computedWeights = [];

    this.update = this.update.bind(this);
    this.createCloud = this.createCloud.bind(this);
  }

  componentDidMount() {
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

      const src = '/static/images/cloud.png';
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

  render() {
    return (
      <div id="page-container" className="page-container">
        <div id="viewport">
          <div id="world"></div>
          <div className="login">
            <div className="login-brand bg-inverse text-white">
              <img src="/static/images/logo_inverse.png" height="36" className="pull-right" /> Flight Path Login
            </div>
            <div className="login-content">
              <div className="text-center m-t-0 m-b-20">Please sign in to your account below.</div>
              <form action="index.html" method="POST" name="login_form" className="form-input-flat">
                <div className="form-group">
                  <input type="text" className="form-control input-lg" placeholder="Email Address" />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control input-lg" placeholder="Password" />
                </div>
                <div className="row m-b-20">
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-lime btn-lg btn-block">Sign in to your account</button>
                  </div>
                </div>
                <div className="text-center">
                  New here? <a href="/register" className="text-muted">Create a new account</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
