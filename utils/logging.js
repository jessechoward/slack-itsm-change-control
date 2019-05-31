const pino = require('pino');
const pkg = require('../package.json');

const logger = pino({
	level: process.env.LOG_LEVEL || 'debug',
	timestamp: true,
	base: {
		application: pkg.name,
		version: pkg.version,
		pid: process.pid,
		uptime: process.uptime()
	}
});

logger.requestLogger = (req, res, next) =>
{
	const start = Date.now();

	res.on('finish', () =>
	{
		const payload = {
			id: req.id,
			src: req.ip,
			protocol: req.protocol,
			hostname: req.hostname,
			path: req.path,
			responseTime: Date.now() - start,
			responseCode: res.statusCode,
			responseMessage: res.statusMessage
		};

		if (res.status < 400)
		{
			logger.info('http-access', payload);
		}
		else if (res.status < 500)
		{
			logger.warn('http-access', payload);
		}
		else
		{
			logger.error('http-access', payload);
		}
	});

	next();
};

module.exports = logger;
