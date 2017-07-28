var path = require('path')
var config = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var webpack = require('webpack')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

process.noDeprecation = true

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        main: './src/main.js',
        editor: './src/editor.js',
        vue:['vue','vue-router','element-ui/lib/theme-default/index.css'],
        react: ['react','react-dom']
    },
    output: {
        path: path.join(__dirname, "../"),
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
   	module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                cssModules: {
                    localIdentName: '[name]-[local]-[hash:base64:5]',
                    camelCase: true
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
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
            loaders: ["style-loader", "css-loader", "sass-loader"]
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
        }]
    },
    plugins: [
    	new BundleAnalyzerPlugin(),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vueCommon',
            chunks: ['vue','main']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'reactCommon',
            chunks: ['react','editor']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'templates/home.html',
            template: './templates/home.ejs',
            inject: false,
            chunks:['manifest','vendor','vueCommon','main']
        }),
        new HtmlWebpackPlugin({
            filename: 'templates/editor.html',
            template: './templates/editor.ejs',
            inject: false,
            chunks:['manifest','vendor','reactCommon','editor']
        }),
        new HtmlWebpackHarddiskPlugin()
    ]
}