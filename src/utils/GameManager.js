const DBManager = require('./DBManager');
const Board = require('../entities/Board');
const Game = require('../entities/Game');
const Player = require('../entities/Player');
const Property = require('../entities/Property');
const Railroad = require('../entities/Railroad');
const C = require('../constants/GameConstants');

class GameManager {
    //SUGERENCIA: EXTRAER MAS METODOS FINDS Y REUTILIZARLOS (AFINAR MAS EL CODIGO)

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

    async findProperties(idBoard) {
        //Buscamos todas las properties que pertenecen al board
        let properties = [];
        let propertiesBBDD = await this.dbm.findProperties(idBoard);
        for (let propertyBBDD of propertiesBBDD) {
            let property = new Property({
                nombre: propertyBBDD.nombre,
                precio: propertyBBDD.precio,
                baseAlquiler: propertyBBDD.baseAlquiler,
                nivelEstructura: propertyBBDD.nivelEstructura,
                color: propertyBBDD.color,
                hipotecado: propertyBBDD.hipotecado,
                posicionBoard: propertyBBDD.posicionBoard,
                id: propertyBBDD.id,
                idPlayer: propertyBBDD.idPlayer
            });
            properties.push(property);
        }
        return properties;
    }

    async findRailroads(idBoard) {
        //Buscamos todos los railroads que pertenecen al board
        let railroads = [];
        let railroadsBBDD = await this.dbm.findRailroads(idBoard);
        for (let railroadBBDD of railroadsBBDD) {
            let railroad = new Railroad({
                nombre: railroadBBDD.nombre,
                precio: railroadBBDD.precio,
                baseAlquiler: railroadBBDD.baseAlquiler,
                hipotecado: railroadBBDD.hipotecado,
                posicionBoard: railroadBBDD.posicionBoard,
                id: railroadBBDD.id,
                idPlayer: railroadBBDD.idPlayer
            });
            railroads.push(railroad);
        }
        return railroads;
    }

    async findBoard(idGame) {
        let boardBBDD = await this.dbm.findBoard(idGame);
        if (boardBBDD == null) {
            boardBBDD = await this.dbm.createBoard(idGame);
        }

        let board = new Board({
            id: boardBBDD.id,
        })

        return board;
    }

    async findPlayers(idGame) {

        let players = [];
        let playersBBDD = await this.dbm.findPlayers(idGame);
        if (playersBBDD != null) {
            playersBBDD.forEach(player => {
                players.push(new Player({
                    id: player.id,
                    nombre: player.nombre,
                    dinero: player.dinero,
                    bancarrota: player.bancarrota,
                    squareActual: player.squareActual,
                    numTurno: player.numTurno,
                    isMovBoard: player.isMovBoard,
                    seccionActual: player.seccionActual
                }));
            });
        }
        return players;
    }

    async findGame(idGame) {

        //Se revisa si se encuentra en el GameManager
        let gameEncontrado = null;
        for (let game of GameManager.games) {
            if (game.id == idGame) {
                gameEncontrado = game;
                break;
            }
        }
        if (gameEncontrado) {
            return gameEncontrado;
        }

        //En caso contrario, se busca en la base de datos
        let gameBBDD = await this.dbm.findGame(idGame);
        if (gameBBDD != null) {
            
            let board = await this.findBoard(idGame);
            let properties = await this.findProperties(board.id);
            let railroads = await this.findRailroads(board.id);
            board.asignarSquares(properties.concat(railroads));
            let players = await this.findPlayers(gameBBDD.id);

            let game = new Game({
                players: players,
                board: board,
                turno: gameBBDD.turno,
                gameFinalizado: gameBBDD.gameFinalizado,
                gameComenzado: gameBBDD.gameComenzado,
                id: gameBBDD.id,
            })
            GameManager.addGame(game);
            return game;
        }
        return { error: "Juego no encontrado" }
    }
    async newPlayer(idGame, nombrePlayer) {
        //Se crea un nuevo jugador para ese juego
        let playerBBDD = await this.dbm.createPlayer(nombrePlayer, idGame);
        let player = new Player({
            id: playerBBDD.id,
            nombre: playerBBDD.nombre,
        });
        return player;
    }

    async newSquares(idBoard) {
        //--- GENERACION DE SQUARES
        let squaresBBDD = await this.dbm.generateSquares();
        let squares = [];
        for (let squareBBDD of squaresBBDD) {
            console.log(squareBBDD.posicionBoard);
            if (squareBBDD.tipo === C.TIPOS_SQUARE.PROPERTY) {
                let propertyBBDD = await this.dbm.createProperty({
                    nombre: squareBBDD.nombre,
                    precio: squareBBDD.precio,
                    baseAlquiler: squareBBDD.baseAlquiler,
                    nivelEstructura: C.NIVEL_ESTRUCTURA_DEFAULT,
                    color: squareBBDD.color,
                    hipotecado: false,
                    posicionBoard: squareBBDD.posicionBoard,
                    idBoard: idBoard
                });

                squares.push(new Property({
                    nombre: squareBBDD.nombre,
                    precio: squareBBDD.precio,
                    baseAlquiler: squareBBDD.baseAlquiler,
                    nivelEstructura: C.NIVEL_ESTRUCTURA_DEFAULT,
                    color: squareBBDD.color,
                    hipotecado: false,
                    posicionBoard: squareBBDD.posicionBoard,
                    id: propertyBBDD.id
                }));
            }
            else if(squareBBDD.tipo === C.TIPOS_SQUARE.RAILROAD) {
                let railroadBBDD = await this.dbm.createRailroad({
                    nombre: squareBBDD.nombre,
                    precio: squareBBDD.precio,
                    baseAlquiler: squareBBDD.baseAlquiler,
                    hipotecado: false,
                    posicionBoard: squareBBDD.posicionBoard,
                    idBoard: idBoard
                });

                squares.push(new Railroad({
                    nombre: railroadBBDD.nombre,
                    precio: railroadBBDD.precio,
                    baseAlquiler: railroadBBDD.baseAlquiler,
                    hipotecado: railroadBBDD.hipotecado,
                    posicionBoard: squareBBDD.posicionBoard,
                    id: railroadBBDD.id
                }))
            }
        }
        return squares;
        //---
    }

    async newBoard(idGame) {
        let boardBBDD = await this.dbm.createBoard(idGame);

        let board = new Board({
            id: boardBBDD.id,
        });

        return board;
    }

    async newGame() {
        let gameBBDD = await this.dbm.createGame();
        let board = await this.newBoard(gameBBDD.id);
        let squares = await this.newSquares(board.id);
        board.asignarSquares(squares);

        let game = new Game({
            board: board,
            id: gameBBDD.id,
        });

        GameManager.addGame(game);
        return game;
    }

    async saveChanges(idGame) {
        let game = await this.findGame(idGame);
        await this.dbm.updateGame(idGame, game.updateState());

        for (const player of game.players) {
            await this.dbm.updatePlayer(player.id, player.updateState());
        }

        for (const square of game.board.squares) {
            if (square instanceof Property) {
                await this.dbm.updateProperty(square.idUpdate, square.updateState());
            }
            else if (square instanceof Railroad) {
                await this.dbm.updateRailroad(square.idUpdate, square.updateState());
            }
        }

        await this.dbm.updateBoard(game.board.id, game.board.updateState());

        return game;
    }
    async joinGame(idGame, nombrePlayer) {
        let game = await this.findGame(idGame);
        if (!game.error) {
            //Se crea un nuevo jugador para ese juego
            let player = await this.newPlayer(idGame, nombrePlayer);
            game.joinGame(player);
            return game;
        }
        return { error: "Juego no encontrado" }
    }
    async startGame(idGame) {

        let game = await this.findGame(idGame);
        if (!game.error) {
            game.inicializarGame();
            await this.saveChanges(idGame);
            return game;
        }
        return { error: "Juego no encontrado" }
    }
}

module.exports = GameManager;