const send = (res, error) => res.json({
  code: error.code || 500,
  name: error.name,
  message: error.message,
});

const build = (name, message, code = 500) => {
  const error = new Error(message);
  error.name = name;
  error.code = code;
  return error;
};

module.exports = {
  send,
  build,
};
