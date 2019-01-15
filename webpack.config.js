var path = require('path');

module.exports = {
	mode: "production",
	entry: {
		'kronos-app-frontend': "./js/src/index.js"
	},
	output: {
		path: path.resolve(__dirname, 'js', 'dist'),
		filename: "[name].js",
		library: 'kronosAppFrontend'
	},
	module: {
		rules: [
			{
				test: /.jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true, // important for performance
							presets: [
								'es2015', 'react',
							],
							plugins: ['jsx-control-statements', 'transform-flow-strip-types', 'syntax-dynamic-import'],
						}
					}
				]
			}
		]
	}
};
