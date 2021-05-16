const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[chunkhash].js'
    },
    
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
              }
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin({}),
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true 
    },

}

