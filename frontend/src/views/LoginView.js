import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class LoginView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.worldXAngle = 0;
    this.worldYAngle = 0;
    this.d = 0;

    this.objects = [];
    this.layers = [];
  }

  update() {
    for( var j = 0; j < layers.length; j++ ) {
        var layer = layers[ j ];
        layer.data.a += layer.data.speed;
        var t = 'translateX( ' + layer.data.x + 'px ) \
            translateY( ' + layer.data.y + 'px ) \
            translateZ( ' + layer.data.z + 'px ) \
            rotateY( ' + ( - worldYAngle ) + 'deg ) \
            rotateX( ' + ( - worldXAngle ) + 'deg ) \
            scale( ' + layer.data.s + ')';
        layer.style.transform = t;
    }

    requestAnimationFrame( update );
  }

  componentDidMount() {
    this.world = document.getElementById( 'world' );
    this.viewport = document.getElementById( 'viewport' );

    if ( world.hasChildNodes() ) {
      while ( world.childNodes.length >= 1 ) {
        world.removeChild( world.firstChild );       
      } 
    }

    for( var j = 0; j <; 5; j++ ) {
      objects.push( this.createCloud() );
    }
  }

  createCloud() {
    let div = document.createElement( 'div'  );
    div.className = 'cloudBase';
    
    var t = 'translateX( ' + random_x + 'px ) \
        translateY( ' + random_y + 'px ) \
        translateZ( ' + random_z + 'px )';
    div.style.transform = t;
    world.appendChild( div );
    
    for( var j = 0; j < 5 + Math.round( Math.random() * 10 ); j++ ) {
        var cloud = document.createElement( 'div' );
        cloud.className = 'cloudLayer';
        
        cloud.data = { 
            x: random_x,
            y: random_y,
            z: random_z,
            a: random_a,
            s: random_s
        };
        var t = 'translateX( ' + random_x + 'px ) \
            translateY( ' + random_y + 'px ) \
            translateZ( ' + random_z + 'px ) \
            rotateZ( ' + random_a + 'deg ) \
            scale( ' + random_s + ' )';
        cloud.style.transform = t;
        
        div.appendChild( cloud );
        layers.push( cloud );
    }
    
    return div;
  }

  render() {
    return (
      <div id="page-container" className="page-container">
        <div id="viewport" style={{bottom: 0, left: 0, overflow: 'hidden', perspective: 400, position: 'absolute', right: 0, top: 0}}>
          <div id="world" style={{height: '512px', left: '50%', margin-left: '-256px', margin-top: '-256px', position: 'absolute', top: '50%', transform-style: 'preserve-3d', width: '512px'}}></div>
          <div className="login">
            <div className="login-brand bg-inverse text-white">
              <img src="images/logo_inverse.png" height="36" className="pull-right" /> Flight Path Login
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
