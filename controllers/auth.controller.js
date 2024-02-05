const DEFAULT_ACCOUNT = {
  username: 'phonghv',
  password: 'phonghv',
};

const jwt = require('jsonwebtoken');
const ErrorResponse = require('../helpers/ErrorResponse');

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    if (
      username !== DEFAULT_ACCOUNT.username ||
      password !== DEFAULT_ACCOUNT.password
    ) {
      throw new ErrorResponse(400, 'account or password is incorrect');
    }

    const accessToken = jwt.sign(DEFAULT_ACCOUNT, 'accress_token', {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(DEFAULT_ACCOUNT, 'refresh_token', {
      expiresIn: '10d',
    });

    return res.status(200).json({accessToken, refreshToken});
  },
  refreshToken: async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new ErrorResponse(401, 'invalid refresh token');
    }
    const refreshToken = authorization.split(' ')[1];

    let decode;
    try {
      decode = jwt.verify(refreshToken, 'refresh_token');
    } catch (error) {
      throw new ErrorResponse(401, 'invalid refresh token');
    }

    const isValidAccount =
      decode.username === DEFAULT_ACCOUNT.username &&
      decode.password === DEFAULT_ACCOUNT.password;

    if (!isValidAccount) {
      throw new ErrorResponse(401, 'invalid refresh token');
    }

    const accessToken = jwt.sign(DEFAULT_ACCOUNT, 'accress_token', {
      expiresIn: '15m',
    });

    return res.status(200).json({accessToken, refreshToken});
  },
  apiAuth: async (req, res) => {
    return res.status(200).json(req.account);
  },
};
