
// Express: Console
class Console {

	// Console: ANSI Colors
	color = {
		black: (message) => `\x1b[30m${message}\x1b[0m`,
		red: (message) => `\x1b[31m${message}\x1b[0m`,
		green: (message) => `\x1b[32m${message}\x1b[0m`,
		yellow: (message) => `\x1b[33m${message}\x1b[0m`,
		blue: (message) => `\x1b[34m${message}\x1b[0m`,
		magenta: (message) => `\x1b[35m${message}\x1b[0m`,
		cyan: (message) => `\x1b[36m${message}\x1b[0m`,
		white: (message) => `\x1b[37m${message}\x1b[0m`,
	}

	// Console: Response StatusCode Colors
	error = {
		1: (code) => this.color.white(code),
		2: (code) => this.color.green(code),
		3: (code) => this.color.cyan(code),
		4: (code) => this.color.red(code),
		5: (code) => this.color.red(code)
	}

	/**
	 * @param {String} message Save Message
	 * @param {[String]} tags Tags
	 * @return {String}
	 */
	log(message, tags = []) {
		return console.log(`${tags.length > 0 ? tags.map((tag) => `\x1b[36m[\x1b[33m${tag}\x1b[36m]\x1b[0m `).join(' ') : ''}${message}`);
	}
}

// Express: Export Console
module.exports = Console;