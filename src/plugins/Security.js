const helmet = require('helmet');
const cors = require('cors');

// Plugins: Security
module.exports = (app, express) => {

	// Security: Cors
	app.use(cors({
		origin: 'http://localhost:3001',
		optionsSuccessStatus: 200,
	}));

	// Security: Helmet
	app.disable('x-powered-by');
	app.use(helmet());
}