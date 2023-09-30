const jwt = require('jsonwebtoken');
const { NotAuthError } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

// const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return next(new NotAuthError('Необходима авторизация'));
  // }

  const token = req.cookies.jwt;
  // console.log(token);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new NotAuthError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
