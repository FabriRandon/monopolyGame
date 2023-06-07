const Router = require('koa-router');
const games = require('./routes/games');

const router = new Router();

router.use('/games', games.routes());

module.exports = router;