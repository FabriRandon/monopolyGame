const C = require('../constants/GameConstants');

class DBManager {
    constructor(orm) {
        this.orm = orm;
    }

    async findGame(idGame) {
        let gameBBDD = await this.orm.Game.findOne({
            where: {
                id: idGame
            }
        });
        return gameBBDD;
    }

    async findPlayers(idGame) {
        let playersBBDD = await this.orm.Player.findAll({
            where: {
                idGame: idGame
            }
        })
        return playersBBDD
    }

    async findBoard(idGame) {
        let boardBBDD = await this.orm.Board.findOne({
            where: {
                idGame: idGame
            }
        })
        return boardBBDD
    }

    async createGame() {
        let gameBBDD = await this.orm.Game.create({
            'turno': C.TURNO_INICIAL,
            'gameFinalizado': false,
            'gameComenzado': false,
        });
        return gameBBDD;
    }

    async createPlayer(nombre, idGame) {
        let playerBBDD = await this.orm.Player.create({
            'nombre': nombre,
            'dinero': C.DINERO_INICIAL,
            'bancarrota': false,
            'squareActual': C.SQUARE_INICIAL,
            'idGame': idGame,
        });
        return playerBBDD;
    }
    async createBoard(idGame) {
        let boardBBDD = await this.orm.Board.create({
            'idGame': idGame,
        });
        return boardBBDD;
    }

    async updateGame(idGame, updatedData) {
        let gameBBDD = await this.orm.Game.findByPk(idGame);
        if(gameBBDD) {
            Object.assign(gameBBDD, updatedData);
            await gameBBDD.save();
            return gameBBDD;
        }
        return null;
    }
    async updatePlayer(idPlayer, updatedData) {
        let playerBBDD = await this.orm.Player.findByPk(idPlayer);
        if(playerBBDD) {
            Object.assign(playerBBDD, updatedData);
            await playerBBDD.save();
            return playerBBDD;
        }
        return null;
    }
    async updateBoard(idBoard, updatedData) {
        let boardBBDD = await this.orm.Board.findByPk(idBoard);
        if(boardBBDD) {
            Object.assign(boardBBDD, updatedData);
            await boardBBDD.save();
            return boardBBDD;
        }
        return null;
    }
}

module.exports = DBManager;