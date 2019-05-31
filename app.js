// look for .env file for basically any non-production environment
if (!(['prod', 'production'].includes(process.env.NODE_ENV)))
{
	require('dotenv').config();
}
const express = require('express');
const helmet = require('helmet');
const requestLogger = require('./utils/logging').requestLogger;
const app = express();

app.use(require('express-request-id')(), requestLogger(), helmet()); 
app.use(express.json(), express.urlencoded({extended: true}));
app.use('/', require('./routes'));

module.exports = app;
