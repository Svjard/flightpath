import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class HomePage extends Component {
  render() {
    return (
      <div id="content" className="content">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="panel panel-info panel-with-tabs">
              <div className="panel-heading">
                <ul id="panel-tab" className="nav nav-tabs nav-tabs-inverse pull-right">
                  <li className="active">
                    <a href="#departures-tab">
                      <img src="images/takeoff.svg" style={{width: '24px', height: '24px'}}></img> <span style={{color: 'white'}} className="hidden-xs">Departures</span>
                    </a>
                  </li>
                  <li>
                    <a href="#arrivals-tab">
                      <img src="images/land.svg" style={{width: '24px', height: '24px'}}></img> <span style={{color: 'white'}} className="hidden-xs">Arrivals</span>
                    </a>
                  </li>
                </ul>
                <h4 className="panel-title" style={{fontWeight: 'bold'}}>Current Schedule</h4>
              </div>
              <div id="panel-tab-content" className="tab-content">
                <div className="tab-pane fade in active" id="departures-tab">
                  <p>Tab Content 1.</p>
                </div>
                <div className="tab-pane fade" id="arrivals-tab">
                  <p>Tab Content 2.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h4 className="panel-title" style={{fontWeight: 'bold'}}>Company Analytics</h4>
              </div>
              <div className="panel-body p-b-15">
                TODO...
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h4 className="panel-title" style={{fontWeight: 'bold'}}>Current Weather Conditions</h4>
              </div>
              <div className="panel-body p-b-15">
                TODO...
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h4 className="panel-title" style={{fontWeight: 'bold'}}>Aircraft Auctions</h4>
              </div>
              <div className="panel-body p-b-15">
                TODO...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
