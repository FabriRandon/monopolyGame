const C = require('../../constants/GameConstants');

class Player {
    constructor(config) {
      this.nombre = config.nombre ?? 'sin nombre';
      this.possessions = config.nombre ?? [];
      this.dinero = config.dinero ?? C.DINERO_INICIAL;
      this.bancarrota = config.bancarrota ?? false;
      this.squareActual = config.squareActual ?? C.SQUARE_INICIAL;
      this.idPlayer = config.idPlayer ?? -1;
      this.idGame = config.idGame ?? -1;
    }
    lanzarDado() {
      return Math.floor(Math.random() * C.DADOS_MAX_VALOR)
       + C.DADOS_MIN_VALOR;
    }
  }
  module.exports = Player;