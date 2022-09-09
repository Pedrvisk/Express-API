require('dotenv').config();
const { resolve } = require('path');

// Dashboard: Express
const Express = require('./src/structures/Express');
new Express({
	greenlock: {
		enabled: false,
		packageRoot: __dirname,
		configDir: resolve('src/config/greenlock'),
		maintainerEmail: 'YOUR_EMAIL'
	},
	api: {
		middlewares: resolve('src/middlewares'),
		controllers: resolve('src/controllers'),
		plugins: resolve('src/plugins'),
		static: resolve('src/public'),
		// basePath: '/api'
	}
}).start(3001);