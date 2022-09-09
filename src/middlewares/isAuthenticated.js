module.exports = (api) =>
	function (req, res, next) {
		console.log('Authenticated!');
		next();
	}