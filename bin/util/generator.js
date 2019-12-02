const fs = require('fs');
const path = require('path');
const projectRoot = path.resolve(__dirname, '../..');

const defaultOptions = {
	srcStyle: 'src/scss/main.scss',
	srcScript: 'src/js/main.js',
	destStyle: 'dist/css/main.css',
	destScript: 'dist/js/main.js'
};

module.exports = function (options) {
	options = Object.assign(defaultOptions, options);

	let result = fs.readFileSync(path.resolve(projectRoot, `webpack.mix.template.js`)).toString();
	Object.keys(options).forEach(function (key) {
		result = result.replace(new RegExp(`%${key}%`), options[key]);
	});
	return result.toString();
};