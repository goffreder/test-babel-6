var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',

    entry: {
        main: [
            './app/App.js'
        ]
    },

    output: {
        path: '__build__',
        publicPath: '__build__',
        filename: 'build.js'
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules[\/\\]/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react', 'stage-0']
            }
        }]
    },

    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        })
    ],

    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
