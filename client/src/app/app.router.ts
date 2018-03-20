import { Routes } from '@angular/router';

import { PickerComponent } from './components/picker/picker.component';


export const appRoutes: Routes = [
	{ path: '', component: PickerComponent },

	// otherwise redirect to home
	{ path: '**', redirectTo: '' },
];

