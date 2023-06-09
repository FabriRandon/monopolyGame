const C = require('../constants/GameConstants');

class Player {
  constructor(config) {
    this.nombre = config.nombre ?? 'sin nombre';
    this.possessions = config.possessions ?? [];
    this.dinero = config.dinero ?? C.DINERO_INICIAL;
    this.bancarrota = config.bancarrota ?? false;
    this.squareActual = config.squareActual ?? C.SQUARE_INICIAL;
    this.idPlayer = config.idPlayer ?? -1;
    this.numTurno = config.numTurno ?? -1;
    this.isMovBoard = config.isMovBoard ?? false;
  }
  lanzarDado() {
    return Math.floor(Math.random() * C.DADOS_MAX_VALOR)
      + C.DADOS_MIN_VALOR;
  }

  moverPlayer(cantidad) {
    this.squareActual += cantidad
  }

  updateState() {
    //Obtiene el estado del game
    return {
      nombre: this.nombre,
      dinero: this.dinero,
      bancarrota: this.bancarrota,
      squareActual: this.squareActual,
      numTurno: this.numTurno,
      isMovBoard: this.isMovBoard
    };
  }
}
module.exports = Player;