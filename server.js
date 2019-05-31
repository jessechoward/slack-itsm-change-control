const app = require('./app');
const logger = require('./utils/logging');

module.exports = class AppServer
{
	constructor()
	{
		this.server = null;
	}

	listen()
	{
		return new Promise((resolve, reject) =>
		{
			if (this.server)
			{
				reject('server already running');
			}
			else
			{
				try
				{
					this.server = app.listen(process.env.LISTEN_PORT, process.env.LISTEN_ADDRESS, () =>
					{
						resolve(this);
					});
					this.server.on('listening', this.onListening.bind(this));
					this.server.on('close', this.onClose.bind(this));
					this.server.on('error', this.onError.bind(this));
				}
				catch(error)
				{
					reject(error);
				}
			}
		});
	}

	stop()
	{
		return new Promise((resolve, reject) =>
		{
			if (!this.server || !this.server.listening)
			{
				reject('server is already stopped');
			}
			else
			{
				logger.info('Initiating server close');
				this.server.close((error) =>
				{
					if (error)
					{
						reject(error);
					}
					else
					{
						resolve();
					}
				});
			}
		});
	}

	onListening()
	{
		logger.info(`Listening on ${this.server.address().address}:${this.server.address().port}`);
	}

	onError(error)
	{
		logger.error('server error', {error: error});
		this.stop();
	}

	onClose()
	{
		logger.warn('server stopped listening');
		this.server = null;
	}
};
