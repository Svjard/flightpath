import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {NameListService} from '../shared/index';
import {HomeComponent} from '../+home/index';
import {AboutComponent} from '../+about/index';

@Component({
  selector: 'fp-app',
  viewProviders: [NameListService],
  templateUrl: 'app/components/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent]
})
@RouteConfig([
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/company',
    name: 'Company',
    component: CompanyComponent
  },
  {
    path: '/fleet',
    name: 'Fleet',
    component: FleetComponent
  },
  {
    path: '/map',
    name: 'Map',
    component: MapComponent
  },
  {
    path: '/about',
    name: 'About',
    component: AboutComponent
  }
])
export class AppComponent {}
