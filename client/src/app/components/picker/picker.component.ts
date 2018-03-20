import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import "@angular/material/prebuilt-themes/indigo-pink.css";
// import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'picker',
	templateUrl: './picker.component.html',
	styleUrls: ['./picker.component.css']
})
export class PickerComponent implements OnInit {
	public tracks: any;
	public playlists: any;

	constructor(private accountService: AccountService, private router: Router) {}

	ngOnInit() {
		this.accountService.getSpotifyPlaylistTracks().then(res => {
			console.log(res);
			this.tracks = res.result;
		});

		this.accountService.getSpotifyPlaylists().then(res => {
			console.log(res);
			this.playlists = res.result;
		});
	}

}