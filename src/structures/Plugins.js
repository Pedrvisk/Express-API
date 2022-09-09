const { existsSync, readdirSync } = require('fs');

// : Plugins
class Plugins {
	constructor(api) {
		this.api = api;
	}

	// Plugins: Init
	async init() {
		if (existsSync(this.api.options.plugins)) {

			const plugins = await readdirSync(this.api.options.plugins).filter((file) => file.endsWith('.js')).map((file) => file.split('.')[0]);
			for (const plugin of plugins) {
				this.api.console.log(this.api.console.color.yellow(plugin), ['PLUGIN']);
				require(`${this.api.options.plugins}/${plugin}`)(this.api);
			}

			return true;
		}

		return false;
	}
}

// : Export Plugins
module.exports = Plugins;