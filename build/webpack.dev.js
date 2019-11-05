const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const modules = require("./webpack.modules.js");

module.exports = merge.smart(common, modules("development"), {
	mode: "development",
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