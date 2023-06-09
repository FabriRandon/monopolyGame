const Router = require('koa-router');
const GameManager = require('../utils/GameManager');
const Game = require('../entities/Game');

const router = new Router();

//Endpoint encargado de crear un juego
router.post('games.create', '/create', async (ctx) => {
    
    const gm = new GameManager(ctx.orm);

    try {
        const resp = ctx.request.body;
        //Crear un nuevo juego
        const newGame = await gm.newGame();
        GameManager.addGame(newGame);

        ctx.body = newGame;
        ctx.status = 201;
    } catch (error) {
        console.log(error);
        ctx.body = error;
        ctx.status = 400;
    }
})

//Endpoint encargado de encontrar un game
router.get('games.find', '/:idGame', async (ctx) => {
    const gm = new GameManager(ctx.orm);
    try {
        const gameFound = await gm.findGame(ctx.params.idGame);
        ctx.body = gameFound;
        ctx.status = 201;
    } catch (error) {
        console.log(error);
        ctx.body = error;
        ctx.status = 400;
    }
})

//Endpoint encargado de unirse a un game
router.post('games.join', '/join', async(ctx) => {
    const gm = new GameManager(ctx.orm);
    try {
        const data = ctx.request.body;
        const gameJoined = await gm.joinGame(data.idGame, data.nombrePlayer);
        ctx.body = gameJoined;
        ctx.status = 201;
    } catch (error) {
        console.log(error);
        ctx.body = { error: error.message };
        ctx.status = 400;
    }
});

//Endpoint encargado de comenzar un game
router.post('games.start', '/start', async(ctx) => {
    const gm = new GameManager(ctx.orm);
    try {
        const data = ctx.request.body;
        const gameStarted = await gm.startGame(data.idGame);
        ctx.body = gameStarted;
        ctx.status = 201;

    } catch (error) {
        console.log(error);
        ctx.body = { error: error.message};
        ctx.status = 400;
    }
})

//Endpoint encargado de generar una accion
router.post('games.action', '/action', async(ctx) => {
    const gm = new GameManager(ctx.orm);
    try{
        const data = ctx.request.body;
        const game = await gm.findGame(data.idGame);
        game.procesarAccion(data.idPlayer,data.action);
        gm.saveChanges(data.idGame);

        ctx.body = game;
        ctx.status = 201;

    } catch (error) {
        console.log(error);
        ctx.body = { error: error.message };
        ctx.status = 400;
    }
})

module.exports = router;