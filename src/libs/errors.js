const send = (res, error) => res.status(error.code || 500).json({
  name: error.name,
  message: error.message,
});

const build = (name, message, code = 500) => {
  const error = new Error(message);
  error.name = name;
  error.code = code;
  return error;
};

const buildValidationError = (e) => {
  const error = new Error(e.message);
  error.name = 'ValidationError';
  error.code = 400;
  return error;
};

module.exports = {
  send,
  build,
  buildValidationError,
};
