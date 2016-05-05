import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './containers/HomePage';
import CompanyPage from './containers/CompanyPage';
import FleetPage from './containers/FleetPage';
import MapPage from './containers/MapPage';
import AboutPage from './containers/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="company" component={CompanyPage}/>
    <Route path="fleet" component={FleetPage}/>
    <Route path="map" component={MapPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
