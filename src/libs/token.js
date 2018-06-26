const jwt = require('jsonwebtoken');
const Config = require('../config.json');

const encodeToken = (user) => {
  const payload = {
    sub: user.payload.id,
  };

  const options = {
    expiresIn: '12h',
  };

  return jwt.sign(payload, Config.secret, options);
};

const decodeToken = token => jwt.verify(token, Config.secret);

module.exports = {
  encodeToken,
  decodeToken,
};
