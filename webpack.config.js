switch(process.env.NODE_ENV) {
	case 'development':
		module.exports = require(`./build/webpack.dev.js`);
		break;
	case 'production':
		module.exports = require(`./build/webpack.prod.js`);
		break;
}