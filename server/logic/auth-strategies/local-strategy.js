const config = require('../../../config/index');

module.exports = (Strategy) => {
	return new Strategy({
		passReqToCallback: true
	}, async function (req, username, password, done) {
		try {
			let user = {
				username, password
			};
			
			if (username === config.get('username') && password === config.get('password')) {
				return done(null, user);
			} else {
				return done(null, false, 'Incorrect username or password');
			}
		} catch (err) {
			done(err);
		}
	});
};
