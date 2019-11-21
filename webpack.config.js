switch(process.env.NODE_ENV) {
	case 'production':
		module.exports = require(`./build/webpack.prod.js`);
		break;
	default:
		module.exports = require(`./build/webpack.dev.js`);
		break;
}