const winston = require('winston');

module.exports.notFound = (req, res, next) => {
  winston.warn('Not found');

  const error = new Error('Not Found');
  error.status = 404;

  next(error);
};

// eslint-disable-next-line no-unused-vars
module.exports.catchAll = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something broke';

  winston.error(message);

  res.status(status).json({ error: { message } });
};
