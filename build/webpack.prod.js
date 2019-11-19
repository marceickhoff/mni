const TerserPlugin = require("terser-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge.smart(common, {
	mode: "production",
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: [
					{
						loader: "clean-css-loader",
						options: {
							all: true
						}
					},
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							plugins: [
								require('autoprefixer'),
								require('mqpacker')({ sort: true })
							]
						}
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