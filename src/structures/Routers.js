const { existsSync, readdirSync } = require('fs');
const responseTime = require('response-time');

// Express: Routers
class Routers {
	constructor(api) {
		this.api = api;
	}

	// Routers: Init
	async init() {
		if (existsSync(this.api.options.controllers)) {

			// Init: Request Log
			this.api.app.use(responseTime((req, res, time) => {
				this.api.console.log(`${this.api.console.error[String(res.statusCode).slice(0, 1)](res.statusCode)} ${this.api.console.color.yellow(req.url)} ${this.api.console.color.cyan(`${time.toFixed(2)}ms`)}`, [`API ${this.api.console.color.cyan('=>')} ${this.api.console.color.yellow(req.method.toUpperCase())}`]);
			}));

			this.api.app.use((req, res, next) => {
				res.data = (statusCode = 200, data = {}) => {
					return res.status(statusCode).json({
						statusCode: res.statusCode || 200,
						data
					});
				}

				next();
			})

			const routes = await readdirSync(this.api.options.controllers).filter((file) => file.endsWith('.js')).map((file) => file.split('.')[0]);
			for (const route of routes) {

				const routerMap = require(`${this.api.options.controllers}/${route}`)(this.api);
				for (const router of routerMap) {
					if (!['get', 'post', 'put', 'patch', 'delete'].includes(router.method.toLowerCase())) return;

					this.api.console.log(`${this.api.console.color.cyan(router.method.toUpperCase())} ${this.api.console.color.yellow(route === 'index' ? this.api.options.basePath ?? '/' : `${this.api.options.basePath ?? ''}/${route}${router.path}`)} ${router.middlewares ? `[${router.middlewares.map((m) => this.api.console.color.cyan(m)).join(', ')}]` : ''}`, ['ROUTER']);
					if (router?.middlewares) {
						this.api.app[router.method.toLowerCase()](route === 'index' ? this.api.options.basePath ?? '/' : `${this.api.options.basePath ?? ''}/${route}${router.path}`, router.middlewares.map((m) => {
							if (!existsSync(`${this.api.options.middlewares}/${m}.js`)) return;
							else return require(`${this.api.options.middlewares}/${m}.js`)(this.api);
						}), router.execute);
					} else {
						this.api.app[router.method.toLowerCase()](route === 'index' ? this.api.options.basePath ?? '/' : `${this.api.options.basePath ?? ''}/${route}${router.path}`, router.execute);
					}
				}

			}

			// Init: Path Error Handler
			this.api.app.use((req, res, next) => {
				return res.status(404).json({
					statusCode: 404,
					statusText: 'Not found'
				});
			});

			// Init: Server Error Handler
			this.api.app.use((err, req, res, next) => {
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