const router = require('express').Router();
const logger = require('../utils/logging');

router.post('/itsm', (req, res) =>
{
	res.status(200).json(req.body);

	logger.debug('headers', req.headers);
	logger.debug('query', req.query);
	logger.debug('body', req.body);
});

module.exports = router;
