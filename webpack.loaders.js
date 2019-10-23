const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const mqpacker = require("mqpacker");

module.exports = function (env) {
	let postcssPlugins = [autoprefixer];
	let loaders = [
		{
			loader: MiniCssExtractPlugin.loader
		},
		{
			loader: "css-loader"
		}
	];
	if (env === "production") {
		loaders.push({
			loader: "clean-css-loader",
			options: {
				all: true
			}
		});
		postcssPlugins.push(mqpacker);
	}
	loaders.push({
		loader: "postcss-loader",
		options: {
			ident: "postcss",
			plugins: postcssPlugins
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
	});
	return {
		mode: env,
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/,
					use: loaders
				},
				{
					test: /\.modernizrrc\.js$/,
					loader: "webpack-modernizr-loader"
				}
			],
		}
	};
};