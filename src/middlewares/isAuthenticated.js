module.exports = (req, res, next) => {
	console.log('Authenticated!');
	next();
}