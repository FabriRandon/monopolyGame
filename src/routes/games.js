const Router = require('koa-router');

const router = new Router();

router.post('juegos.create', '/create', async (ctx) => {
    try {
        const resp = ctx.request.body;
        ctx.body = "respuesta";
        ctx.status = 201;
    } catch (error) {
        console.log(error);
        ctx.body = error;
        ctx.status = 400;
    }
})

module.exports = router;