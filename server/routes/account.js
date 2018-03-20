const passport = require('passport');

module.exports = function (router, spotifyApi) {
	router.get('/spotify/get-playlist-tracks', async function (req, res, next) {
		let tracks = await spotifyApi.getPlaylistTracks('5vkrl4dmsc4l1in857fd4dl75', '0IZcAfIuNbyrG6t8sUTmcW', { 'offset': 0, 'limit': 78, 'fields': 'items' })

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
			// .then(function (data) {
				console.log('Retrieved playlists', data.body);
		// 	}, function (err) {
		// 		console.log('Something went wrong!', err);
		// 	});
		// let tracks = await spotifyApi.getPlaylistTracks('5vkrl4dmsc4l1in857fd4dl75', '0IZcAfIuNbyrG6t8sUTmcW', { 'offset': 0, 'limit': 78, 'fields': 'items' })

		let result = [];

		for (let i = 0; i < data.body.items.length; i++) {
			let playlist = data.body.items[i];

			result.push({
				name: playlist.name,
				image: playlist.images[2].url
			})
		}
		

		res.json({ result })
	});

	router.get('/error', function (req, res, next) {
		res.sendFile('error.html', { root: './server/views' });
	});

	return router;
};
