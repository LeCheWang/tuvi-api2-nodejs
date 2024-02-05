const express = require('express');
const router = express.Router();

const AsyncMiddleware = require('../middlewares/async');
const AuthMiddleware = require('../middlewares/auth');

const {
  login,
  refreshToken,
  apiAuth,
} = require('../controllers/auth.controller');

router.route('/login').post(AsyncMiddleware(login));
router.route('/refresh-token').post(AsyncMiddleware(refreshToken));
router
  .route('/profile')
  .get(AsyncMiddleware(AuthMiddleware), AsyncMiddleware(apiAuth));

module.exports = router;
