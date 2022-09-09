const express = require('express');
const axios = require('axios');

// Backend: Express
class Express {
	constructor({
		greenlock = {
			enabled: false,
			packageRoot: __dirname,
			configDir: './greenlock',
			maintainerEmail: process.env.MAINTAINEREMAIL,
			cluster: false
		},
		api = {
			middlewares: __dirname + '/middlewares',
			controllers: __dirname + '/controllers',
			plugins: __dirname + '/plugins',
			static: __dirname + '/public',
			basePath: '/'
		}
	}) {
		this.app = express();
		this.greenlock = greenlock;
		this.express = express;
		this.options = api;
		this.axios = axios;

		// Express: Console Log
		const Console = require('./Console');
		this.console = new Console;

		// Express: Plugins
		const Plugins = require('./Plugins');
		this.plugins = new Plugins(this);

		// Express: API Routers
		const Routers = require('./Routers');
		this.routers = new Routers(this);
	}

	/**
	 * @param {Number} port [Default: 3001]
	 * @param {String | Number} [hostname] [Default: localhost]
	 * @returns {Server} Express Application
	 */
	async start(port = 3001, hostname = 'localhost') {
		if (!port || isNaN(port)) port = 3001;
		if (!hostname) hostname = 'localhost';

		// Start: Load Plugins
		if (this.options.plugins) await this.plugins.init();

		// Start: Load Routers
		if (this.options) await this.routers.init();

		if (this.greenlock.enabled === true) {
			this.console.log(`Start: ${this.console.color.green('HTTPS/SSL')}`, ['SERVER']);

			// Start: HTTPS/SSL Listen Server
			return require('greenlock-express').init({
				packageRoot: this.greenlock.packageRoot,
				configDir: this.greenlock.configDir,
				maintainerEmail: this.greenlock.maintainerEmail,
				cluster: this.greenlock.cluster
			}).serve(this.app);
		} else {

			// Start: Listen Server
			return this.app.listen(port, () => this.console.log(`Start: ${this.console.color.green(`http://${hostname}:${port}`)}`, ['SERVER']));
		}
	}
}

// Backend: Export Express
module.exports = Express;