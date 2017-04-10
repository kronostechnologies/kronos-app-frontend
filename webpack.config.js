var path = require('path');

module.exports = {
	entry: {
		'kronos-app-frontend': "./js/src/index.js"
	},
	output: {
		path: path.resolve(__dirname, 'js', 'dist'),
		filename: "[name].js",
		library: 'kronosAppFrontend'
	},
	module: {
		loaders: [{
			test: /.jsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['es2015', 'react'],
				plugins: ['jsx-control-statements', 'transform-flow-strip-types', 'lodash', 'syntax-dynamic-import']
			}
		}]
	}
};
