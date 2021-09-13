var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 8081,
        static: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
            title: 'Development',
            template: 'src/index.html',
        }),
    ],
};
