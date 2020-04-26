const path = require('path');
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

module.exports = {
	mode: "production",
	entry: {
		'kronos-app-frontend': "./js/src/index.js"
	},
	output: {
		path: path.resolve(__dirname, 'js', 'dist'),
		filename: "[name].js",
		library: 'kronosAppFrontend',
		libraryTarget: 'umd',
	},
	target: 'web',
	externals: {
		'@sentry/browser' : {
			commonjs: '@sentry/browser',
			commonjs2: '@sentry/browser'
		},
		'jquery': {
			root: '$',
			commonjs: 'jquery'
		},
		'jquery-param': 'jquery-param',
		'moment': 'moment',
		'es6-error' : 'es6-error',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true, // important for performance
							babelrc: true,
						},
					},
				],
			}
		]
	},
    resolve: {
        plugins: [
            PnpWebpackPlugin,
        ],
    },
    resolveLoader: {
        plugins: [
            PnpWebpackPlugin.moduleLoader(module),
        ],
    },
};
