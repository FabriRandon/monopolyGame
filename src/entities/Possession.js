const C = require('../constants/GameConstants');
const Square = require('./Square');

class Possession extends Square {
  constructor(config) {
      super(config);
      this.precio = config.precio ?? C.PRECIO_DEFAULT;
      this.hipotecado = config.hipotecado ?? false;
  }  
  calcularAlquiler() {
    //Los hijos implementan la accion a su manera
  }
  updateState() {
    //Obtiene el estado de Property
    return {
      nombre: this.nombre,
      precio: this.precio,
      hipotecado: this.hipotecado
    };
  }  
}

module.exports = Possession;