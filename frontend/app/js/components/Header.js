import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <div id="header">
        <div id="logo" className="light-version">
          <img src="/static/images/slb-logo.png" style={{display: 'inline-block', width: '150px', marginRight: '20px', marginTop: '-6px'}} />
          <span style={{lineHeight: '40px', textAlign: 'center', display: 'inline-block', fontSize: '20px', fontWeight: 'bold'}}>
            Production Optimization Platform
          </span>
        </div>
        <nav role="navigation">
          <div className="navbar-right">
            <ul className="nav navbar-nav no-borders">
              <li>
                <Link to="/admin">
                  <i className="fa fa-lock"></i>
                </Link>
              </li>
              <li>
                <Link to="/help">
                  <i className="fa fa-question-circle"></i>
                </Link>
              </li>
              <li>
                <Link to="/logout">
                  <i className="fa fa-sign-out"></i>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
