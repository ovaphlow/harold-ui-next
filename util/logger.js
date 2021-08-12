const bunyan = require('bunyan'); // eslint-disable-line

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

module.exports = logger; // eslint-disable-line
