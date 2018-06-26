const express = require('express');
const bodyParser = require('body-parser');

const Errors = require('./libs/errors');
const publicRouter = require('./routes/public');
const privateRouter = require('./routes/private');

const app = express();

/**
 * Parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * Routes
 */
app.use('/public', publicRouter);
app.use('/private', privateRouter);

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  return Errors.send(res, err);
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
