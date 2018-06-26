const jwt = require('jsonwebtoken');
const Config = require('../config.json');

class Token {
  static encodeFromUser(user) {
    const payload = {
      sub: user.payload.id,
    };
    const options = {
      expiresIn: '12h',
    };
    return jwt.sign(payload, Config.secret, options);
  }

  static decodeToken(token) {
    return jwt.verify(token, Config.secret);
  }
}


module.exports = Token;
