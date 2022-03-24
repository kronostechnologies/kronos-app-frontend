const presets = [
    [
        '@babel/preset-env',
        {
            modules: 'commonjs',
            useBuiltIns: 'entry',
            corejs: {
                version: 3,
                proposals: true,
            },
            exclude: [
                '@babel/plugin-proposal-dynamic-import',
            ],
        },
    ],
    '@babel/preset-flow',
];

const plugins = [
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-runtime',
];

const ignore = [
    /node_modules/,
];

module.exports = { presets, plugins, ignore };
