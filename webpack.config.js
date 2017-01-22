var path = require('path');

module.exports = {
	entry: {
		application: "./js/components/index.jsx",
	},
	output: {
		path: './js/bundle',
		filename: "[name].js"
	},
	module: {
		loaders: [{
			test: /.jsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['es2015', 'react'],
				plugins: ['jsx-control-statements', 'transform-flow-strip-types', 'babel-root-import', 'lodash']
			}
		}]
	}
};
