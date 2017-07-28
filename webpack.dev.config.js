var webpack = require('webpack')
var config = require('./config')
var baseWebpackConfig = require('./webpack.base.conf')
var merge = require('webpack-merge')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    // module: {
    //       noParse: /vue\.esm/
    // },
    // module: {
    //   rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    // },
    // cheap-module-eval-source-map is faster for development
    resolve: {
        extensions: ['.js', '.vue', '.json']
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ]
})



// const webpack = require('webpack');
// const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const autoprefixer = require('autoprefixer');
// const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// module.exports = {
//     entry: {
//         'main.js': ['./src/main.js', 'webpack-hot-middleware/client'],
//         'editor.js': ['./src/editor.js', 'webpack-hot-middleware/client']
//     },
//     output: {
//         path: '/',
//         publicPath: 'http://localhost:3000/dist/',
//         filename: '[name]'
//     },
//     module: {
//         loaders: [{
//             test: /\.vue$/,
//             loader: 'vue',
//             options: {
//                 cssModules: {
//                     localIdentName: '[name]-[local]-[hash:base64:5]',
//                     camelCase: true
//                 }
//             }
//         }, {
//             test: /\.js$/,
//             loader: 'babel',
//             exclude: /node_modules/
//         }, {
//             test: /\.(html|tpl)$/,
//             loader: 'html-loader'
//         }, {
//             test: /\.(png|jpg|gif|svg)$/,
//             loader: 'file?limit=8192',
//             query: {
//                 name: '[name].[ext]?[hash]'
//             }
//         }, {
//             test: /\.css$/,
//             loader: 'style-loader!css-loader'
//         }, 
//             {
//                 test: /\.scss$/,
//                 loaders: ["style", "css", "sass"]
//             },
//         {
//             test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
//             loader: 'file-loader'
//         }, {
//             test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
//             loader: 'file-loader',
//             query: {
//                 name: '[name].[ext]?[hash]'
//             }
//         }]
//     },
//     devtool: '#eval-source-map',
//     resolve: {
//         extensions: ['', '.js', '.scss', '.vue'],
//     },
//     plugins: [
//         new BundleAnalyzerPlugin(),
//         new webpack.HotModuleReplacementPlugin(),
//         new webpack.NoErrorsPlugin(),
//         new HtmlWebpackPlugin({
//             alwaysWriteToDisk: true,
//             filename: 'templates/home.html',
//             template: './templates/home.ejs',
//             inject: false
//         }),
//         new HtmlWebpackPlugin({
//             alwaysWriteToDisk: true,
//             filename: 'templates/editor.html',
//             template: './templates/editor.ejs',
//             inject: false
//         }),
//         new HtmlWebpackHarddiskPlugin()
//     ]
// };


