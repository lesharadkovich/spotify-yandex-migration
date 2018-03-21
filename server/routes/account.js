const passport = require('passport');
var scopes = ['user-read-private', 'user-read-email', 'playlist-read-private'],
	state = 'some-state-of-my-choice';

module.exports = function (router, spotifyApi) {
	router.get('/spotify/get-playlist-tracks', async function (req, res, next) {
		let id = req.query.id;
		let total = req.query.total;
		console.log(id, total)

		let tracks = await spotifyApi.getPlaylistTracks('5vkrl4dmsc4l1in857fd4dl75', id, { 'offset': 0, 'limit': total, 'fields': 'items' })

		let result = [];

		for (let i = 0; i < tracks.body.items.length; i++) {
			let track = tracks.body.items[i].track;

			result.push({
				name: track.name,
				artist: track.artists ? track.artists[0].name : 'N/A',
				image: track.album ? track.album.images[2].url : 'N/A'
			})
		}

		res.json({ result })
	});

	router.get('/spotify/get-playlists', async function (req, res, next) {
		let data = await spotifyApi.getUserPlaylists('5vkrl4dmsc4l1in857fd4dl75')

		let result = [];

		for (let i = 0; i < data.body.items.length; i++) {
			let playlist = data.body.items[i];

			let image;
			if (playlist.images) {
				if (playlist.images[2]) image = playlist.images[2].url;
				else image = playlist.images[0].url;
			}

			result.push({
				id: playlist.id,
				name: playlist.name,
				image: image,
				tracksAmount: playlist.tracks.total
			})
		}


		res.json({ result })
	});

	router.get('/spotify/auth', async function (req, res, next) {
		var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

		res.json({ authorizeURL });
	});

	router.get('/spotify/callback', async function (req, res, next) {
		let code = req.query.code;

		try {
			let data = await spotifyApi.authorizationCodeGrant(code);

			console.log('The token expires in ' + data.body['expires_in']);
			console.log('The access token is ' + data.body['access_token']);
			console.log('The refresh token is ' + data.body['refresh_token']);

			// Set the access token on the API object to use it in later calls
			spotifyApi.setAccessToken(data.body['access_token']);
			spotifyApi.setRefreshToken(data.body['refresh_token']);
			res.redirect('http://localhost:8080');
		} catch (err) {
			console.log('Something went wrong!', err);
			res.send(err.statusCode, err.message);
		}
	});

	router.get('/spotify/user', async function (req, res, next) {
		// var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
		spotifyApi.getMe()
			.then(function (data) {
				console.log('Some information about this user', data.body);

				res.json({ result: data.body });
			}, function (err) {
				console.log('Something went wrong!', err);
			});
	});

	return router;
};
