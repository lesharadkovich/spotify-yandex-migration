import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';
// import {HttpRequest} from "@angular/common/http";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountService {

	constructor(private http: Http, private httpClient: HttpClient) {
	}


	getSpotifyPlaylistTracks() {
        return this.http.get('/spotify/get-playlist-tracks').toPromise().then((res) => {
            return res.json()
        });
	}

	getSpotifyPlaylists() {
        return this.http.get('/spotify/get-playlists').toPromise().then((res) => {
            return res.json()
        });
	}
}