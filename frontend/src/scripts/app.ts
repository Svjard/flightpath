import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {TodoComponent} from './todo/todo.component';
import {AboutComponent} from './about/about.component';

@Component({
  selector: 'app',
  providers: [
    ROUTER_PROVIDERS
  ],
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div>
      <ul class="nav nav-pills">
        <li class="nav-item"><a class="nav-link" [routerLink]="['Todo']">Todo</a></li>
        <li class="nav-item"><a class="nav-link" [routerLink]="['About']">About</a></li>
      </ul>
      <hr>
      <router-outlet></router-outlet>
    </div>
  `
})
@RouteConfig([
  { path: '/todo', name: 'Todo', component: TodoComponent, useAsDefault: true },
  { path: '/about', name: 'About', component: AboutComponent }
])
export class AppComponent {
  public title = 'Bonvoyage';
}
