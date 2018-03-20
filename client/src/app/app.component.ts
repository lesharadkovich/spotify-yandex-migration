import { Component } from '@angular/core';
import '../assets/css/styles.css';

import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private router: Router) {
	}
}
