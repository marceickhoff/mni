module.exports = (env, argv) => {
	let configs = [];
	if (!argv.mode || argv.mode === "development") configs.push(require("./build/webpack.dev.js"));
	if (!argv.mode || argv.mode === "production") configs.push(require("./build/webpack.prod.js"));
	return configs;
};