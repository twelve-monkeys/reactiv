var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var path = require('path');

module.exports = {
    resolve: {
        extensions: ['', '.ts']
    },
    target: "web",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "reactiv.js",
        library: 'shared-components',
        libraryTarget: 'umd'
    },
    entry: "./reactiv.ts",
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            },
        ]
    },
    plugins: [
        new ForkCheckerPlugin()
    ]
};