import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import { HomeView, LoginView, CompanyView, FleetView, MapView, AboutView } from '../views';
import { requireAuthentication } from '../components/AuthenticatedComponent';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuthentication(HomeView)} />
    <Route name="login" path="/login" component={LoginView}/>
    <Route path="company" component={requireAuthentication(CompanyView)}/>
    <Route path="fleet" component={requireAuthentication(FleetView)}/>
    <Route path="map" component={requireAuthentication(MapView)}/>
    <Route path="about" component={AboutView}/>
  </Route>
);
