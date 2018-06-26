const Joi = require('joi');
const hash = require('hash-string');
const Token = require('../libs/token');
const Errors = require('../libs/errors');

const Users = require('../classes/user');

/**
 * Create a user in memory.
 * Return generated webtoken.
 */

const create = (req, res, next) => {
  // Validation rules
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).required();

  return Joi.validate(req.body, schema)
    .catch((e) => {
      throw Errors.buildValidationError(e);
    })
    .then((params) => {
      let user = Users.getUserByUsername(params.username);
      if (user) throw Errors.build('BadRequestError', 'Username does already exist.', 403);
      user = new Users(params.username, params.password);
      return res.json({ token: Token.encodeFromUser(user) });
    })
    .catch(e => next(e));
};

/**
 * User wants to generate a token for further requests.
 * If username does not exists, create automatically a user.
 */

const token = (req, res, next) => {
  // Validation rules
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  return Joi.validate(req.body, schema)
    .catch((e) => {
      throw Errors.buildValidationError(e);
    })
    .then((params) => {
      let user = Users.getUserByUsername(params.username);
      if (user && user.payload.password !== hash(params.password)) throw Errors.build('AuthenticationError', 'Password is wrong for this user', 403);
      if (!user) user = new Users(params.username, params.password);
      return res.json({ token: Token.encodeFromUser(user) });
    })
    .catch(e => next(e));
};

/**
 * Get infos about a user.
*/
const me = (req, res) => {
  // User is in request because of authentication middleware.
  const { user } = req;
  return res.json({ user: user.format() });
};


/**
 * Try to craft a potion and update User data.
 */
const craft = (req, res, next) => {
  // Validation rules
  const schema = Joi.object().keys({
    ingredients: Joi.array().items(Joi.object().keys({
      id: Joi.number().required(),
      quantity: Joi.number().required(),
    })).min(3).max(3)
      .required(),
  });

  return Joi.validate(req.body, schema)
    .catch((e) => {
      throw Errors.buildValidationError(e);
    })
    .then((params) => {
      // User is in request because of authentication middleware.
      const { user } = req;
      const { ingredients } = params;
      const success = user.craft(ingredients);
      return res.json({ success, user: user.format() });
    })
    .catch(e => next(e));
};

/**
 * Reset User data
 */
const reset = (req, res) => {
  const { user } = req;
  user.reset();
  return res.json({ user: user.format() });
};

module.exports = {
  create,
  token,
  me,
  craft,
  reset,
};
