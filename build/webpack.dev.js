const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge.smart(common, {
	mode: "development",
	devtool: "source-map"
});