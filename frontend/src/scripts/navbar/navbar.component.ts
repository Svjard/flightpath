import {Component} from 'angular2/core';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.template.html'
})
export class NavbarComponent {
	constructor() {
		console.log('navbar component');
	}
}
