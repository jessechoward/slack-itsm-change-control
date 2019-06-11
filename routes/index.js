const router = require('express').Router();

router.post('/itsm', (req, res) =>
{
	res.status(200).send('Ok');
	
	console.log(`headers: ${req.headers}`);
	console.log(`body: ${req.body}`);
	console.log(`query: ${req.query}`);
});

module.exports = router;
