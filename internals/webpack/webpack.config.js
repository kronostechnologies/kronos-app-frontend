const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        'kronos-app-frontend': './js/src/index.js',
    },
    output: {
        path: path.resolve(process.cwd(), 'js', 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
    },
    target: 'web',
    externals: {
        '@sentry/browser': {
            commonjs: '@sentry/browser',
            commonjs2: '@sentry/browser',
        },
        jquery: {
            root: '$',
            commonjs: 'jquery',
        },
        'jquery-param': 'jquery-param',
        moment: 'moment',
        'es6-error': 'es6-error',
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
            },
        ],
    },
};
