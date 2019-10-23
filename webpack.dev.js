const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge.smart(common, {
	mode: "development",
	output: {
		filename: 'js/[name].js'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		}),
	],
	devtool: "source-map",
	resolve: {
		modules: [path.resolve("lib/js/modules"), "node_modules"]
	}
});