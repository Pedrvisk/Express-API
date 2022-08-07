const { existsSync, readdirSync } = require('fs');
const responseTime = require('response-time');

// Express: Routers
class Routers {
	constructor(express) {
		this.options = express.api;
		this.app = express.app;
		this.express = express;
	}

	// Routers: Init
	async init() {
		if (existsSync(this.options.controllers)) {

			// Init: Request Log
			this.app.use(responseTime((req, res, time) => {
				this.express.console.log(`${this.express.console.error[String(res.statusCode).slice(0, 1)](res.statusCode)} ${this.express.console.color.yellow(req.url)} ${this.express.console.color.cyan(`${time.toFixed(2)}ms`)}`, [`API ${this.express.console.color.cyan('=>')} ${this.express.console.color.yellow(req.method.toUpperCase())}`]);
			}));

			this.app.use((req, res, next) => {
				res.data = (statusCode = 200, data = {}) => {
					return res.status(statusCode).json({
						statusCode: res.statusCode || 200,
						data
					});
				}

				next();
			})

			const routes = await readdirSync(this.options.controllers).filter((file) => file.endsWith('.js')).map((file) => file.split('.')[0]);
			for (const route of routes) {

				const routerMap = require(`${this.options.controllers}/${route}`)(this.app, this.express);
				for (const router of routerMap) {
					if (!['get', 'post', 'put', 'patch', 'delete'].includes(router.method.toLowerCase())) return;

					this.express.console.log(`${this.express.console.color.cyan(router.method.toUpperCase())} ${this.express.console.color.yellow(route === 'index' ? this.options.basePath : `${this.options.basePath}/${route}${router.path}`)} ${router.middlewares ? `[${router.middlewares.map((m) => this.express.console.color.cyan(m)).join(', ')}]` : ''}`, ['ROUTER']);
					if (router?.middlewares) {
						this.app[router.method.toLowerCase()](route === 'index' ? this.options.basePath : `${this.options.basePath}/${route}${router.path}`, router.middlewares.map((m) => {
							if (!existsSync(`${this.options.middlewares}/${m}.js`)) return;
							else return require(`${this.options.middlewares}/${m}.js`);
						}), router.execute);
					} else {
						this.app[router.method.toLowerCase()](route === 'index' ? this.options.basePath : `${this.options.basePath}/${route}${router.path}`, router.execute);
					}
				}

			}

			// Init: Path Error Handler
			this.app.use((req, res, next) => {
				return res.status(404).json({
					statusCode: 404,
					statusText: 'Not found'
				});
			});

			// Init: Server Error Handler
			this.app.use((err, req, res, next) => {
				const statusCode = err.status || 400;
				return res.status(statusCode).json({
					statusCode,
					statusText: err.message
				});
			});

			return true;
		}

		return false;
	}
}

// Express: Export Routers
module.exports = Routers