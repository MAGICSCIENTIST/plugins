const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');


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
        filename: "[name]/[name].js",
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    "css-loader"
                ]
                // use: [
                //     'style-loader',
                //     'css-loader'
                // ]
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
                        // presets: ['@babel/preset-env'],
                        presets: [
                            ['@babel/preset-env', {

                            }]
                        ],
                        plugins: [
                            ['@babel/transform-runtime', {
                                "corejs": 2,
                                "regenerator": true
                            }]
                        ]

                    }
                }
            }

        ]
    }
    // devServer: {
    //     contentBase: './dist'
    // },
}