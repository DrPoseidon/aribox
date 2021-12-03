const uuid = require('uuid');
const apiRouter = require('express').Router();
// генерация случайного id
apiRouter.get('/uuid', (req, res) => {
  return res.status(200).json({uuid: `${uuid.v4()}-${new Date().getTime()}`});
});

module.exports = apiRouter;
