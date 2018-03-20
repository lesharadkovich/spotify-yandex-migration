const SpotifyWebApi = require('spotify-web-api-node');
const YandexMusicApi = require('yandex-music-api');
const config = require('./config');

const clientId = 'a3ae92cd46654ffdb8fa32e7aac2a3e9';
const clientSecret = '01a70f9954cb40958e149f7408295b24';

// Create the api object with the credentials
let spotifyApi = new SpotifyWebApi({
	clientId: clientId,
	clientSecret: clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
	.then((data) => {
		console.log('The access token expires in ' + data.body['expires_in']);
		console.log('The access token is ' + data.body['access_token']);

		// Save the access token so that it's used in future calls
		spotifyApi.setAccessToken(data.body['access_token']);

		spotifyApi.getPlaylistTracks('5vkrl4dmsc4l1in857fd4dl75', '0IZcAfIuNbyrG6t8sUTmcW', { 'offset': 0, 'limit': 78, 'fields': 'items' })
			.then(function (data) {
				// console.log(data.body.items[0]);
				let queryArray = [];

				for (let i = 0; i < data.body.items.length; i++) {
					let track = data.body.items[i].track;

					queryArray.push(`${track.name} - ${track.artists[0].name}`);
				}


				var api = new YandexMusicApi();

				api.init(config.user)
					.then(function () {

						var name = 'General',
							options = { 'visibility': 'public' };

						return api.createPlaylist(name, options).then(function (playlist) {

							console.log('New playlist has been created:')
							console.log('Name: ' + playlist.title);
							console.log('Kind: ' + playlist.kind);
							console.log('Visibility: ' + playlist.visibility);

							return playlist;
						});

					})
					.then(async function (playlist) {
						let tracks = [];

						for (let i = 0; i < queryArray.length; i++) {
							let query = queryArray[i];
							let options = { type: 'track' }

							let result = await api.search(query, options)

							if (result.tracks) {
								let track = result.tracks.results[0];
								tracks.push({ id: track.id, albumId: track.albums[0].id })
							}

						}

						return { tracks, playlist };
					})
					.then(function (data) {
						let playlist = data.playlist;
						let tracks = data.tracks;


						return api.addTracksToPlaylist(playlist.kind, tracks, playlist.revision).then(function (playlist) {

							console.log('Added ' + playlist.trackCount + ' tracks to the playlist:');

							return playlist;
						});
					})
					.catch(function (err) {
						console.log('Error: ', err);
					});

			}, function (err) {
				console.log('Something went wrong!', err);
			});
	})
	.catch((err) => {
		console.log('Something went wrong when retrieving an access token', err);
	});