module.exports = (env, argv) => {
	let configs = [];
	if (!argv.mode || argv.mode === "development") configs.push(require("./config/webpack.dev.js"));
	if (!argv.mode || argv.mode === "production") configs.push(require("./config/webpack.prod.js"));
	return configs;
};