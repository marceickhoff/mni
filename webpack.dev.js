const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const loaders = require("./webpack.loaders.js");

module.exports = merge.smart(common, loaders("development"), {
	output: {
		filename: "js/[name].js"
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].css"
		}),
	],
	devtool: "source-map"
});