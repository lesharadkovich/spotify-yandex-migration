const express = require('express');
const session = require('express-session');
const path = require('path');
// const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const config = require('../config');


const SpotifyWebApi = require('spotify-web-api-node');
const clientId = 'a3ae92cd46654ffdb8fa32e7aac2a3e9';
const clientSecret = '01a70f9954cb40958e149f7408295b24';

const app = express();

(async function () {

	// Create the api object with the credentials
	let spotifyApi = new SpotifyWebApi({
		clientId: clientId,
		clientSecret: clientSecret
	});

	// Retrieve an access token.
	let data = await spotifyApi.clientCredentialsGrant()
	console.log('The access token expires in ' + data.body['expires_in']);
	console.log('The access token is ' + data.body['access_token']);

	// Save the access token so that it's used in future calls
	spotifyApi.setAccessToken(data.body['access_token']);


	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());



	app.use(express.static(path.join(__dirname, '../client/dist')));

	app.use(passport.initialize());
	app.use(passport.session());


	//TODO Routes
	const router = require('express-promise-router')();
	app.use(require('./routes/account')(router, spotifyApi));



	app.use(function errorHandler(err, req, res, next) {
		console.error(err.stack);
		res.send(500, err.stack);
	});




	let http = require('http');

	let port = config.port || '3000';
	app.set('port', port);
	let server = http.createServer(app);

	server.listen(Number(port));
	server.on('listening', function onListening() {
		console.log('Listening on ' + port);
	});

	server.on('error', function onError(error) {
		switch (error.code) {
			case 'EACCES':
				console.error(port + ' requires elevated privileges');
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error(port + ' is already in use');
				process.exit(1);
				break;
			default:
				throw error;
		}
	});
})().catch(err => console.error(err.stack));

