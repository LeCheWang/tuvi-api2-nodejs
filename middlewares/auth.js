const jwt = require('jsonwebtoken');
const ErrorResponse = require('../helpers/ErrorResponse');
const DEFAULT_ACCOUNT = {
  username: 'phonghv',
  password: 'phonghv',
};

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const message_auth = 'invalid token';
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorResponse(401, message_auth);
  }
  const token = authorization.split(' ')[1];

  let decode;
  try {
    decode = jwt.verify(token, 'accress_token');
  } catch (error) {
    throw new ErrorResponse(401, message_auth);
  }

  const isValidAccount =
    decode.username === DEFAULT_ACCOUNT.username &&
    decode.password === DEFAULT_ACCOUNT.password;

  if (!isValidAccount) {
    throw new ErrorResponse(401, 'invalid token');
  }

  req.account = DEFAULT_ACCOUNT;
  next();
};
