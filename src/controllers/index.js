module.exports = (api) => [
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