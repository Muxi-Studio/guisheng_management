const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        'main.js': ['./src/main.js'],
        'editor.js': ['./src/editor.js'],
        'vue-ele.js': ['vue','vue-router','element-ui/lib/theme-default/index.css'],
        'reactBundle.js': ['react','react-dom']
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: '/admin/static/',
        filename: '[name]'
    },
    module: {
        noParse: [/vue\.runtime\.min/, /vue-router\.min/, /react\.min/],
        resolveLoader: {
            root: path.join(__dirname, "node_modules")
        },
        loaders: [{
            test: /\.vue$/,
            loader: 'vue',
            options: {
                cssModules: {
                    localIdentName: '[name]-[local]-[hash:base64:5]',
                    camelCase: true
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.(html|tpl)$/,
            loader: 'html-loader'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file?limit=8192',
            query: {
                name: '[name].[ext]?[hash]'
            }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, 
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
        {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            loader: 'file-loader',
            query: {
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    devtool: '#eval-source-map',
    resolve: {
        extensions: ['', '.js', '.scss', '.vue'],
        alias: {
            'vue': path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.min'),
            'vue-router': path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.min'),
            'react': path.resolve(__dirname, 'node_modules/react/dist/react.min'),
            'react-dom': path.resolve(__dirname, 'node_modules/react-dom/dist/react-dom.min'),
            'draft-js': path.resolve(__dirname, 'node_modules/draft-js/dist/Draft.min'),
        }
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: function(module, count) {
        //         // any required modules inside node_modules are extracted to vendor
        //         return (
        //             module.resource &&
        //             /\.js$/.test(module.resource) &&
        //             module.resource.indexOf(
        //                 path.join(__dirname, '../node_modules')
        //             ) === 0
        //         )
        //     }
        // }),
        //extract webpack runtime and module manifest to its own file in order to
        //prevent vendor hash from being updated whenever app bundle is updated
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     chunks: ['vendor']
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vueEle',
            chunks: ['vue-ele.js']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'reactBundle',
            chunks: ['reactBundle.js']
        }),
        new BundleAnalyzerPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'templates/home.html',
            template: './templates/home.ejs',
            inject: false,
            chunks: ['vueEle','main.js']
        }),
        new HtmlWebpackPlugin({
            filename: 'templates/editor.html',
            template: './templates/editor.ejs',
            inject: false,
            chunks: ['reactBundle','editor.js']
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,
            },
        }),
        // new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js")
    ]
};