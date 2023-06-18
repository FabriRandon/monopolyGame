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
                idGame: idGame,
                bancarrota: false
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

    async findProperties(idBoard) {
        let propertyBBDD = await this.orm.Property.findAll({
            where: {
                idBoard: idBoard
            }
        })
        return propertyBBDD;
    }

    async generateSquares() {
        let squaresBBDD = await this.orm.MoldSquare.findAll();
        return squaresBBDD;
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
            'numTurno': -1,
            'isMovBoard': false,
            'seccionActual': C.SECCIONES.MENU_PRINCIPAL,
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
    async createProperty({
        nombre = C.NOMBRE_DEFAULT,
        precio = C.PRECIO_DEFAULT,
        baseAlquiler = C.BASE_ALQUILER_DEFAULT,
        nivelEstructura = C.NIVEL_ESTRUCTURA_DEFAULT,
        color = C.COLOR_DEFAULT,
        hipotecado = false,
        idPlayer = null,
        idBoard = null
      }) {
        let propertyBBDD = await this.orm.Property.create({
          nombre: nombre,
          precio: precio,
          baseAlquiler: baseAlquiler,
          nivelEstructura: nivelEstructura,
          color: color,
          hipotecado: hipotecado,
          idPlayer: idPlayer,
          idBoard: idBoard
        });
      
        return propertyBBDD;
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

    async updateProperty(idProperty, updatedData) {
        let propertyBBDD = await this.orm.Property.findByPk(idProperty);
        if(propertyBBDD) {
            Object.assign(propertyBBDD, updatedData);
            await propertyBBDD.save();
            return propertyBBDD;
        }
        return null;
    }
}

module.exports = DBManager;