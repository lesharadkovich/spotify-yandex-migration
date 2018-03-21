import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import "@angular/material/prebuilt-themes/indigo-pink.css";
import { concat } from 'rxjs/operators/concat';
// import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'picker',
	templateUrl: './picker.component.html',
	styleUrls: ['./picker.component.css']
})
export class PickerComponent implements OnInit {
	public tracks: any;
	public playlists: any;

	constructor(private accountService: AccountService, private router: Router) { }

	ngOnInit() {



	}

	auth() {
		this.accountService.auth().then(res => {
			console.log(res.authorizeURL)
			window.location.href = res.authorizeURL;
		});
	}

	getPlaylists() {
		this.accountService.getSpotifyPlaylists().then(res => {
			console.log(res);
			this.playlists = res.result;
		});
	}

	getUser() {
		this.accountService.getUser().then(res => {
			console.log(res);
		})
	}

	selectPlaylist(playlist: any) {
		this.accountService.getSpotifyPlaylistTracks(playlist.id, playlist.tracksAmount).then(res => {
			console.log(res);
			this.tracks = res.result;
		});
	}
}