const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const r = require('babel-plugin-transform-runtime')

module.exports = {
    target: "web",
    devtool: "cheap-eval-source-map",
    mode: "development",
    entry: {
        historyImage: "./src/historyImage/index.js",
        legislation: "./src/legislation/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"), // string
        filename: "[name].js",
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new HtmlWebpackPlugin({
        //     title: 'Output Management'
        // })
    ],
    module: {
        rules: [
            { test: /\.jpg$/, use: ["file-loader"] },
            { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },
            { test: /\.png$/, use: ["url-loader?mimetype=image/png"] },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        // plugins: ['@babel/transform-runtime']
                    }
                }
            }

        ]
    }
    // devServer: {
    //     contentBase: './dist'
    // },
}