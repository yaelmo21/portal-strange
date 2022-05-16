const htmlWebpack = require('html-webpack-plugin');
const MiniCssExtrack = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    output: {
        clean: true,
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
        ]
    },
    optimization: {},
    plugins: [new htmlWebpack({
            title: 'portal-strange',
            template: './src/index.html',
            favicon: './src/assets/favicon.ico'
        }),
        new MiniCssExtrack({
            filename: '[name]-[fullhash]-min.css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/assets', to: 'assets/' },
            ]
        })
    ]
}