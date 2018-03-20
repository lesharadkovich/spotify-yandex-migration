const path = require('path');

function root(...args) {
	return path.join.apply(path, [path.resolve(__dirname, '..')].concat(args));
}

exports.root = root;