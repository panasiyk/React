const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});
module.exports = {
    watch: true,
    watchOptions: {
        aggregateTimeout: 100,
        poll: false
    },
    devtool: "eval",
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, "public/source")
    },
    devServer: {
        contentBase: path.join(__dirname, "public/source"),
        compress: true,
        port: 3000,
        historyApiFallback: true
    },
    module: {
        rules: [
            // {
            //   test: /\.js$/,
            //   exclude: /node_modules/,
            //   loader: "eslint-loader",
            // },
            {
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react', 'stage-0']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader?sourceMap',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
                    'resolve-url-loader',
                    'sass-loader?sourceMap'
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader']
                })
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        extractPlugin,
        new webpack.HotModuleReplacementPlugin()
    ]
};