import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';

@Component({
  selector: 'app',
  providers: [
    ROUTER_PROVIDERS
  ],
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `
})
@RouteConfig([
  { path: '/about', name: 'About', component: AboutComponent },
  { path: '/login', name: 'Login', component: LoginComponent, useAsDefault: true }
])
export class AppComponent {
  public title = 'Bonvoyage';
}
