const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const Errors = require('./libs/errors');
const publicRouter = require('./routes/public');
const privateRouter = require('./routes/private');

const app = express();

/**
 * CORS
 */
app.use(cors());

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

app.listen(4000, () => {
  console.log('App is listening on port 4000');
});
