const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const WebpackMd5Hash = require('webpack-md5-hash');


module.exports = {
    entry: {
        main: './src/js/index.js',
        favorit: './src/js/favorit-news/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: ['transform-class-properties']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                        // 'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
                        {
                                loader: 'file-loader',
                                options: {
                                    name: './images/[name].[ext]',
                                    esModule: false
                                }
                        },
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]'
            },
            {
                    test: /\.css$/i,
                    use: [
                        (isDev ? 'style-loader' : { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } }),
                        {
                          loader: 'css-loader',
                          options: {
                            importLoaders: 2
                          }
                        },
                          'postcss-loader',
                            ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            // Означает, что:
            inject: false, // стили НЕ нужно прописывать внутри тегов
            template: './src/pages/index.html', // откуда брать образец для сравнения с текущим видом проекта
            filename: 'index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
            chunks: ['main'] //указываем точку входа первой страницы
        }),
        new HtmlWebpackPlugin({
            // Означает, что:
            inject: false, // стили НЕ нужно прописывать внутри тегов
            template: './src/pages/favorit.html', // откуда брать образец для сравнения с текущим видом проекта
            filename: 'favorit.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
            chunks: ['favorit'] //указываем точку входа второй страницы
        }),
        new OptimizeCssAssetsPlugin({ // подключите плагин после MiniCssExtractPlugi
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true,
        }),
        new WebpackMd5Hash() 
    ]
};