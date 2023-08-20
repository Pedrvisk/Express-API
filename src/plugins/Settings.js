
// Plugins: Settings
module.exports = (api) => {
	api.app.use(api.express.static(api.options.static));
	api.app.use(api.express.json());
	api.app.use(api.express.urlencoded({ extended: false }));
}