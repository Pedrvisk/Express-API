module.exports = (api) => [
	{
		path: '/',
		method: 'GET',
		middlewares: ['loggedIn'],
		execute(req, res, next) {
			return res.data(200, {
				message: 'fodase porra'
			});
		}
	},
	{
		path: '/:find',
		method: 'GET',
		execute(req, res, next) {
			return res.data(200, req.params.find);
		}
	},
	{
		path: '/',
		method: 'POST',
		execute(req, res, next) {
			next();
		}
	}
]