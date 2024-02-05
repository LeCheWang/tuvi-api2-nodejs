const errorHandle = require('../middlewares/error.handle');
const ErrorResponse = require('../helpers/ErrorResponse');
const imageRouter = require('./image.router');
const authRouter = require('./auth.router');

module.exports = (app) => {
  app.use('/api/image', imageRouter);
  app.use('/api/auth', authRouter);
  app.use('*', (req, res, next) => {
    throw new ErrorResponse(404, 'Page not foundd');
  });
  app.use(errorHandle);
};
