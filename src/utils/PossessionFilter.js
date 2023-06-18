const Property = require('../entities/Possession');
const C = require('../constants/GameConstants');

class PossessionFilter {

  static hipotecados(pos, possessions) {
    return pos.hipotecado ? true : false;
  }
  static noHipotecados(pos, possessions) {
    return pos.hipotecado ? false : true;
  }
  static conEstructuras(pos, possessions) {
    return pos.nivelEstructura > 0 ? true : false;
  }
  static hipotecables(pos, possessions) {
    return !pos.hipotecado && pos.nivelEstructura == 0 ? true : false;
  }
  static conEstructuras(pos, possessions) {
    return pos.nivelEstructura > 0 ? true : false;
  }
  static construibles(pos, possessions) {
    return !pos.hipotecado && pos.nivelEstructura < C.NIVEL_MAX_ESTRUCTURA
      && pos.verificarColores(possessions) && pos.verificarRelativosConstruir(possessions) ? true : false;
  }
}

module.exports = PossessionFilter;