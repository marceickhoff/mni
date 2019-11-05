const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (env) {
	let postcssPlugins = [require('autoprefixer')];
	let loaders = [];

	// Add style loaders
	loaders.push(
		{
			loader: MiniCssExtractPlugin.loader
		},
		{
			loader: "css-loader"
		}
	);

	// Add clean-css loader and mqpacker for production
	if (env === "production") {
		loaders.push(
			{
				loader: "clean-css-loader",
				options: {
					all: true
				}
			}
		);
		postcssPlugins.push(require('mqpacker')(
			{
				sort: true
			}
		));
	}

	// Add more style loaders
	loaders.push(
		{
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
		}
	);

	// Return module config
	return {
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