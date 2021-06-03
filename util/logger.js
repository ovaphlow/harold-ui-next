const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'harold',
  streams: [
    {
      level: 'info',
      stream: process.stdout, // eslint-disable-line
    },
    {
      level: 'error',
      path: './harold-error.log',
    },
  ],
});

module.exports = logger;
