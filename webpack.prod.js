const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const autoprefixer = require("autoprefixer");
const mqpacker = require("mqpacker");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge.smart(common, {
	mode: "production",
	output: {
		filename: 'js/[name].min.js'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].min.css'
		}),
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [autoprefixer, mqpacker]
						}
					},
					{
						loader: 'clean-css-loader',
						options: {
							all: true
						}
					},
					{
						loader: "sass-loader"
					}
				]
			}
		],
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				terserOptions: {
					warnings: false,
					module: false,
					output: {
						comments: false
					},
					toplevel: false,
					ie8: false,
					keep_fnames: false,
					safari10: false
				}
			}),
		],
	}
});