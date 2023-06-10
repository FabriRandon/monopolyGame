const Property = require('../entities/Possession');

class PossessionFilter {

  static hipotecados(pos) {
    return pos.hipotecado ? true : false;
  }
  static noHipotecados(pos) {
    return pos.hipotecado ? false : true;
  }
  static conEstructuras(pos) {
    return pos instanceof Property && pos.nivelEstructura > 0 ? true : false;
  }
  static hipotecables(pos) {
    return !pos.hipotecado && pos.nivelEstructura == 0 ? true : false;
  }
}

module.exports = PossessionFilter;