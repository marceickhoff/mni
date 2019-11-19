const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
	entry: [
		path.resolve("lib/js/core.js"),
		path.resolve("lib/sass/core.sass")
	],
	output: {
		filename: `js/[name]${(isProd ? ".min" : "")}.js`
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `css/[name]${(isProd ? ".min" : "")}.css`
		})
	],
	resolve: {
		alias: {
			mni: path.resolve("lib/js/modules")
		}
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				enforce: "pre",
				use: [
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
				test: /\.s[ac]ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader"
					}
				]
			},
			{
				test: /\.modernizrrc\.js$/,
				loader: "webpack-modernizr-loader"
			}
		],
	}
};