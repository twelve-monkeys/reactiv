var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var path = require('path');

module.exports = {
    resolve: {
        extensions: ['', '.ts', '.tsx', '.webpack.js', '.web.js']
    },

    devtool: 'inline-source-map',

    output: {
        path: path.join(path.join(__dirname, "test"), "output"),
        filename: "[name].js"
    },

    entry: {
        test: "./test/dom/Spec.ts"
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.tsx$/,
                loader: 'babel-loader!awesome-typescript-loader&forkChecker=true'
            }
        ]
    },
    plugins: [
        new ForkCheckerPlugin()
    ]
};