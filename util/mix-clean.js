const path = require('path');
const fs = require('fs');
const CleanCSS = require('clean-css');
const chalk = require('chalk');

const showError = function(err) {
	process.stdout.write(` ${chalk.black.bgRed(" ERROR ")} ${chalk.red(err.name + ": " + err.message)}\n`);
};

const showDone = function(message) {
	process.stdout.write(` ${chalk.black.bgGreen(" DONE ")} ${chalk.green(message)}\n`);
};

module.exports = function(stats) {
	let prod = false;
	for (let key in stats.compilation.assets){
		let asset = stats.compilation.assets[key];
		if (path.extname(asset.existsAt) === '.css') {
			fs.readFile(path.resolve(__dirname, asset.existsAt), function (err, input) {
				if (err) return showError(err);
				process.stdout.write(`\nCleaning ${chalk.whiteBright.bold(asset.existsAt)}`);
				let output = new CleanCSS({
					level: 2,
					format: prod ? false : 'beautify'
				}).minify(input);
				fs.writeFile(asset.existsAt, output.styles, function (err) {
					if (err) return showError(err);
					showDone(`Reduced size to ${output.stats.minifiedSize} bytes (-${Math.round(output.stats.efficiency * 100)}%) in ${output.stats.timeSpent}ms`);
				});
			});
		}
	}
};