let config;

switch(process.env.NODE_ENV) {
	case 'development':
		config = require(`./build/webpack.dev.js`);
		break;
	case 'production':
		config = require(`./build/webpack.prod.js`);
		break;
}
module.exports = config;