const Token = require('../libs/token');
const Users = require('../classes/user');
const Errors = require('../libs/errors');

module.exports = (req, res, next) => {
  const { token } = req;
  try {
    if (!token) Errors.build('AuthenticationError', 'Authentication Token is missing.', 403);
    const decoded = Token.decodeToken(token);
    const userId = decoded.sub;
    const user = Users.getUserById(userId);
    // User does not exists anymore because of server event.
    if (!user) throw Errors.build('AuthenticationError', 'This user does not exists anymore', 403);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
