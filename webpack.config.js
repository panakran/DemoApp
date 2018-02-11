//FIXME: copy resource maybe removed?
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);

module.exports = {
    context: path.join(__dirname, ''),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {// used to support all browsers @https://webpack.js.org/loaders/babel-loader/
                        presets: ['babel-preset-env']
                    }
                }
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
        
    ],

    entry: "./entry-webpack.js",
    output: {
        path: __dirname,
        filename: "./dist/bundle.js"
    }
};