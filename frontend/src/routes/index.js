import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import * as views from '../views';
import { requireAuthentication } from '../components/AuthenticatedComponent';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuthentication(views.HomeView)} />
    <Route name="login" path="/login" component={views.LoginView}/>
    <Route name="register" path="/register" component={views.RegisterView}/>
    <Route path="company" component={requireAuthentication(views.CompanyView)}/>
    <Route path="fleet" component={requireAuthentication(views.FleetView)}/>
    <Route path="map" component={requireAuthentication(views.MapView)}/>
    <Route path="about" component={views.AboutView}/>
  </Route>
);
