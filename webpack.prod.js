const htmlWebpack = require('html-webpack-plugin');
const MiniCssExtrack = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    output: {
        clean: true,
        filename: 'main.[fullhash].js'
    },
    module: {
        rules: [{
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false,
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]
    },
    plugins: [new htmlWebpack({
            title: 'portal-strange',
            template: './src/index.html',
            favicon: './src/assets/favicon.ico'
        }),
        new MiniCssExtrack({
            filename: '[name].[fullhash]-min.css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/assets', to: 'assets/' },
            ]
        })
    ]
}