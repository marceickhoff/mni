const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProd = process.env.NODE_ENV === "production";

const defaultConfig = {
	styleSyntax: "scss",
	styleSrc: "lib/scss",
	styleDist: "dist/css",
	styleName: "main",
	scriptSrc: "lib/js",
	scriptDist: "dist/js",
	scriptName: "main"
};

module.exports = function (config) {
	if (typeof config === "undefined") config = defaultConfig;
	else config = Object.assign(defaultConfig, config);
	return {
		entry: [
			path.resolve(`${config.scriptSrc}/${config.scriptName}.js`),
			path.resolve(`${config.styleSrc}/${config.styleName}.${config.styleSyntax}`)
		],
		output: {
			path: path.resolve(config.scriptDist),
			filename: `[name]${(isProd ? ".min" : "")}.js`
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: `${path.relative(path.resolve(config.scriptDist), path.resolve("."))}/${config.styleDist}/[name]${(isProd ? ".min" : "")}.css`
			})
		],
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
	}
};