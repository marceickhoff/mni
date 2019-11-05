const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const modules = require("./webpack.modules.js");

module.exports = merge.smart(common, modules("production"), {
	mode: "production",
	output: {
		filename: "js/[name].min.js"
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].min.css"
		}),
	],
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