const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require("autoprefixer");

module.exports = {
	entry: [
		path.resolve('lib/js/mni.js'),
		path.resolve('lib/sass/mni.sass')
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [autoprefixer]
						}
					},
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								outputStyle: "expanded",
								indentType: "tab",
								indentWidth: 1,
								sourceMap: true,
								linefeed: "crlf",
								precision: 3
							},
						},
					}
				]
			},
			{
				loader: "webpack-modernizr-loader",
				test: /\.modernizrrc\.js$/
			}
		],
	},
	resolve: {
		modules: [path.resolve("lib/js/modules"), "node_modules"]
	}
};