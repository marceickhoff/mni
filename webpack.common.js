const path = require("path");

module.exports = {
	entry: [
		path.resolve("lib/js/mni.js"),
		path.resolve("lib/sass/mni.sass")
	],
	resolve: {
		modules: [path.resolve("lib/js/modules"), "node_modules"]
	}
};