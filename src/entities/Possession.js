const C = require('../constants/GameConstants');
const Square = require('./Square');

class Possession extends Square {
  constructor(config) {
    super(config);
    this.precio = config.precio ?? C.PRECIO_DEFAULT;
    this.hipotecado = config.hipotecado ?? false;
    this.idPlayer = config.idPlayer ?? null;
  }
  calcularAlquiler() {
    //Los hijos implementan la accion a su manera
  }

  revisarPropietario(players, squares) {
    //Revisamos si la possession tiene un propietario
    let prop = null;

    for (let i = 0; i < players.length; i++) {
      let pos = players[i].obtenerPossessions(squares);
      for (let j = 0; j < pos.length; j++) {
        if (pos[j].id === this.id) {
          prop = players[i];
        }

      }
    }
    return prop
  }

  calcularHipoteca() {
    return this.precio * C.FACTOR_HIPOTECA;
  }

  hipotecar(player) {
    if(!this.hipotecado && this.idPlayer == player.id) {
      let valorHipoteca = this.calcularHipoteca();
      player.dinero += valorHipoteca;
      this.hipotecado = true;
      return true;
    }
    return false;
  }

  updateState() {
    //Obtiene el estado de Property
    return {
      nombre: this.nombre,
      precio: this.precio,
      hipotecado: this.hipotecado,
      idPlayer: this.idPlayer
    };
  }
}

module.exports = Possession;