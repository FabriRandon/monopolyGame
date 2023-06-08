const DBManager = require('./DBManager');
const Board = require('../entities/Board');
const Game = require('../entities/Game');
const Player = require('../entities/Player');


class GameManager {

    static games = [];

    constructor(orm) {
        this.orm = orm;
        this.dbm = new DBManager(orm);
    }

    static addGame(game) {
        GameManager.games.push(game);
    }
    static removeGame(game) {
        const index = GameManager.games.indexOf(game);
        if (index !== -1) {
          GameManager.games.splice(index, 1);
        }
    }

    async joinGame(idGame, nombrePlayer) {
        let game = await this.findGame(idGame);
        if(!game.error) {
            //Se crea un nuevo jugador para ese juego
            let playerBBDD = await this.dbm.createPlayer(nombrePlayer, game.idGame);
            let player = new Player({
                idPlayer : playerBBDD.id,
                nombre: playerBBDD.nombre,
                dinero: playerBBDD.dinero,
                bancarrota: playerBBDD.bancarrota,
                squareActual: playerBBDD.squareActual,
                numTurno: playerBBDD.numTurno,
                isMovBoard: playerBBDD.isMovBoard
            });
            game.joinGame(player);
            return game;
        }
        return {error: "Juego no encontrado"}
    }

    async findGame(idGame) {

        //Se revisa si se encuentra en el GameManager
        let gameEncontrado = null;
        for(let game of GameManager.games) {
            if(game.idGame == idGame) {
                gameEncontrado = game;
                break;
            }
        }
        if(gameEncontrado) {
            return gameEncontrado;
        }

        //En caso contrario, se busca en la base de datos
        let gameBBDD = await this.dbm.findGame(idGame);
        if(gameBBDD != null) {
            let boardBBDD = await this.dbm.findBoard(idGame);
            if(boardBBDD == null) {
                boardBBDD = await this.dbm.createBoard(idGame);
            }
            let board = new Board({
                idBoard: boardBBDD.id
            })
            let players = []
            let playersBBDD = await this.dbm.findPlayers(gameBBDD.id);
            if(playersBBDD != null) {
                playersBBDD.forEach(player => {
                    players.push(new Player({
                        idPlayer : player.id,
                        nombre: player.nombre,
                        dinero: player.dinero,
                        bancarrota: player.bancarrota,
                        squareActual: player.squareActual,
                        numTurno: player.numTurno,
                        isMovBoard: player.isMovBoard
                    }))
                })
            }
            let game = new Game({
                players: players,
                board: board,
                turno: gameBBDD.turno,
                gameFinalizado: gameBBDD.gameFinalizado,
                gameComenzado: gameBBDD.gameComenzado,
                idGame: gameBBDD.id
            })
            GameManager.addGame(game);
            return game;
        }
        return {error: "Juego no encontrado"}
    }

    async newGame() {

        let gameBBDD = await this.dbm.createGame();
        console.log(gameBBDD.id)
        let boardBBDD = await this.dbm.createBoard(gameBBDD.id);

        let board = new Board({
            idBoard: boardBBDD.id,
        });

        let game = new Game({
            board: board,
            turno: gameBBDD.turno,
            gameFinalizado: gameBBDD.gameFinalizado,
            gameComenzado: gameBBDD.gameComenzado,
            idGame: gameBBDD.id,
        });

        GameManager.addGame(game);
        return game;
    }

    async saveChanges(idGame) {
        let game = await this.findGame(idGame);
        await this.dbm.updateGame(idGame, game.updateState());
        
        for(const player of game.players) {
            await this.dbm.updatePlayer(player.idPlayer, player.updateState());
        }

        await this.dbm.updateBoard(game.board.id, game.board.updateState());

        return game;
    }

    async startGame(idGame) {

        let game = await this.findGame(idGame);
        if(!game.error) {
            game.inicializarGame();
            await this.saveChanges(idGame);
            return game;
        }
        return {error: "Juego no encontrado"}


    }

}

module.exports = GameManager;