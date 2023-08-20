const helmet = require('helmet');
const cors = require('cors');

// Plugins: Security
module.exports = (api) => {

	// Security: Cors
	api.app.use(cors({
		origin: 'http://localhost:3001',
		optionsSuccessStatus: 200,
	}));

	// Security: Helmet
	api.app.disable('x-powered-by');
	api.app.use(helmet());
}