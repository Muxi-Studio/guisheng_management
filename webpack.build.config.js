var path = require('path')
var webpack = require('webpack')
var config = require('./config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue': path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.min'),
            'vue-router': path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.min'),
            // 'react': path.resolve(__dirname, 'node_modules/react/dist/react.min'),
            // 'react-dom': path.resolve(__dirname, 'node_modules/react-dom/dist/react-dom.min'),
            // 'draft-js': path.resolve(__dirname, 'node_modules/draft-js/dist/Draft.min'),
        }
    },
    module: {
        noParse: [/vue\.runtime\.min/, /vue-router\.min/,]
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: '/admin/static/',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        })
    ]
})

module.exports = webpackConfig




// const webpack = require('webpack');
// const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const autoprefixer = require('autoprefixer');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// module.exports = {
//     entry: {
//         'main': ['./src/main.js'],
//         'editor': ['./src/editor.js'],
//         vueEle: ['vue','vue-router','element-ui/lib/theme-default/index.css'],
//         element: ['element-ui'],
//         reactBundle: ['react-draft-wysiwyg','html-to-draftjs','draftjs-to-html']
//     },
//     output: {
//         path: path.join(__dirname, "dist"),
//         publicPath: '/admin/static/',
//         filename: '[name].js'
//     },
//     module: {
//         noParse: [/vue\.runtime\.min/, /vue-router\.min/, /react\.min/],
//         resolveLoader: {
//             root: path.join(__dirname, "node_modules")
//         },
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
//         }
//         }]
//     },
//     devtool: '#eval-source-map',
//     resolve: {
//         extensions: ['', '.js', '.scss', '.vue'],
//         alias: {
//             'vue': path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.min'),
//             'vue-router': path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.min'),
//             'react': path.resolve(__dirname, 'node_modules/react/dist/react.min'),
//             'react-dom': path.resolve(__dirname, 'node_modules/react-dom/dist/react-dom.min'),
//             'draft-js': path.resolve(__dirname, 'node_modules/draft-js/dist/Draft.min'),
//         }
//     },
//     plugins: [
//         // new webpack.optimize.CommonsChunkPlugin({
//         //     name: 'vendor',
//         //     minChunks: function(module, count) {
//         //         // any required modules inside node_modules are extracted to vendor
//         //         return (
//         //             module.resource &&
//         //             /\.js$/.test(module.resource) &&
//         //             module.resource.indexOf(
//         //                 path.join(__dirname, '../node_modules')
//         //             ) === 0
//         //         )
//         //     }
//         // }),
//         //extract webpack runtime and module manifest to its own file in order to
//         //prevent vendor hash from being updated whenever app bundle is updated
//         // new webpack.optimize.CommonsChunkPlugin({
//         //     name: 'manifest',
//         //     chunks: ['vendor']
//         // }),
//         new BundleAnalyzerPlugin(),
//         // new webpack.optimize.CommonsChunkPlugin({
//         //     name: 'vueEle',
//         //     chunks: ['vueEle']
//         // }),
//         // new webpack.optimize.CommonsChunkPlugin({
//         //     name: 'reactBundle',
//         //     chunks: ['reactBundle']
//         // }),
//         new webpack.optimize.OccurenceOrderPlugin(),
//         new webpack.HotModuleReplacementPlugin(),
//         new webpack.NoErrorsPlugin(),
//         new HtmlWebpackPlugin({
//             filename: 'templates/home.html',
//             template: './templates/home.ejs',
//             inject: false,
//             chunks: ['vueEle','element','main']
//         }),
//         new HtmlWebpackPlugin({
//             filename: 'templates/editor.html',
//             template: './templates/editor.ejs',
//             inject: false,
//             chunks: ['reactBundle','editor']
//         }),
//         new webpack.optimize.UglifyJsPlugin({
//             mangle: true,
//             compress: {
//                 warnings: false,
//             },
//         }),
//         new webpack.optimize.CommonsChunkPlugin("vueEle", "vue-ele.js"),
//         new webpack.optimize.CommonsChunkPlugin("element", "element.js"),
//         new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
//         // new webpack.optimize.CommonsChunkPlugin("reactBundle", "react-bundle.js"),
//     ]
// };