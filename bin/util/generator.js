const fs = require('fs');
const path = require('path');
const projectRoot = path.resolve(__dirname, '../..');

module.exports = function (options) {
	let result = fs.readFileSync(path.resolve(projectRoot, `webpack.mix.template.js`)).toString();
	Object.keys(options).forEach(function (key) {
		result = result.replace(new RegExp(`%${key}%`), options[key]);
	});
	return result.toString();
};