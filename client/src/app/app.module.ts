import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { appRoutes } from './app.router';

//components
import { AppComponent } from './app.component';
import { PickerComponent } from './components/picker/picker.component';

//services
import { AccountService } from './services/account.service';

// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatTableModule } from '@angular/material/table';
// import { MatSelectModule } from '@angular/material/select';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatListModule } from '@angular/material/list';
// import { MatCardModule } from '@angular/material/card';
// import { MatDialogModule, MatDialog, MatDialogRef, MatNativeDateModule } from '@angular/material';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { MatIconModule } from '@angular/material/icon';
// import { MAT_DATE_LOCALE } from '@angular/material-moment-adapter';



@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, { useHash: true }),
		BrowserModule,
		FormsModule,
		HttpModule,
		BrowserAnimationsModule,
		// MatInputModule,
		// MatButtonModule,
		// MatMenuModule,
		// MatTabsModule,
		// MatExpansionModule,
		// MatChipsModule,
		// MatProgressBarModule,
		// MatSnackBarModule,
		// MatAutocompleteModule,
		// MatTableModule,
		HttpClientModule,
		// MatDialogModule,
		// MatSelectModule,
		// MatCheckboxModule,
		// ReactiveFormsModule,
		// MatListModule,
		// MatCardModule,
		// MatSlideToggleModule,
		// MatDatepickerModule,
		// MatProgressSpinnerModule,
		// MatNativeDateModule,
		// MatPaginatorModule,
		// MatSortModule,
		// MatIconModule
	],
	declarations: [
		AppComponent,
		PickerComponent
	],
	providers: [
		AccountService,
		// MatDialog
	],
	entryComponents: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}