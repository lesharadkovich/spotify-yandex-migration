let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let helpers = require('./helpers');

module.exports = {
	entry: {
		'polyfills': './client/src/polyfills.ts',
		'vendor'   : './client/src/vendor.ts',
		'app'      : './client/src/main.ts'
	},

	resolve: {
		extensions: ['.ts', '.js']
	},

	module: {
		rules: [{
			test   : /\.ts$/,
			loaders: [{
				loader : 'awesome-typescript-loader',
				options: {
					configFileName: helpers.root('client', 'src', 'tsconfig.json')
				}
			}, 'angular2-template-loader']
		},
		{
			test  : /\.html$/,
			loader: 'html-loader'
		},
		{
			test  : /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
			loader: 'file-loader?name=assets/[name].[ext]'
		},
		{
			test   : /\.css$/,
			exclude: helpers.root('client', 'src', 'app'),
			loader : ExtractTextPlugin.extract({
				fallbackLoader: 'style-loader',
				loader        : 'css-loader?sourceMap'
			})
		},
		{
			test   : /\.css$/,
			include: helpers.root('client', 'src', 'app'),
			loader : 'raw-loader'
		}
		]
	},

	plugins: [
		new webpack.ContextReplacementPlugin(/@angular(\\|\/)core(\\|\/)esm5/, helpers.root('./client/src')),

		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),

		new HtmlWebpackPlugin({
			template: './client/src/index.html'
		}),

		new CopyWebpackPlugin([{
			from: './client/src/manifest.json'
		}, {
			from: './client/src/assets/icons',
			to  : 'assets/icons'
		}])
	]
};