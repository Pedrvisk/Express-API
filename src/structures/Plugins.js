const { existsSync, readdirSync } = require('fs');

// Express: Plugins
class Plugins {
	constructor(express) {
		this.options = express.api;
		this.app = express.app;
		this.express = express;
	}

	// Plugins: Init
	async init() {
		if (existsSync(this.options.plugins)) {

			const plugins = await readdirSync(this.options.plugins).filter((file) => file.endsWith('.js')).map((file) => file.split('.')[0]);
			for (const plugin of plugins) {
				this.express.console.log(this.express.console.color.yellow(plugin), ['PLUGIN']);
				require(`${this.options.plugins}/${plugin}`)(this.app, this.express);
			}

			return true;
		}

		return false;
	}
}

// Express: Export Plugins
module.exports = Plugins;