module.exports = (app, express) => [
	{
		path: '/',
		method: 'GET',
		execute(req, res, next) {
			return res.data(200, {
				message: 'API Online!'
			});
		}
	}
]