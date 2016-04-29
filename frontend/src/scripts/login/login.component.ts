import {Component} from 'angular2/core';

@Component({
  selector: 'login',
  templateUrl: './login.template.html'
})
export class LoginComponent {
  constructor() {
    console.log('login component');
  }
}
