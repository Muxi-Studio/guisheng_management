const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        'main.js': ['./src/main.js'],
        'editor.js': ['./src/editor.js'],
        vendor: ["vue","vue-router",'element-ui/lib/theme-default/index.css']
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
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'templates/home.html',
            template: './templates/home.ejs',
            inject: false,
            chunks: ['main.js','vendor']
        }),
        new HtmlWebpackPlugin({
            filename: 'templates/editor.html',
            template: './templates/editor.ejs',
            inject: false,
            chunks: ['editor.js']
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,
            },
        }),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js")
    ]
};