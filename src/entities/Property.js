const C = require('../constants/GameConstants');
const Possession = require('./Possession');

class Property extends Possession {
  constructor(config) {
    super(config);   
    this.baseAlquiler = config.baseAlquiler ?? C.BASE_ALQUILER_DEFAULT;
    this.nivelEstructura = config.nivelEstructura ?? C.NIVEL_ESTRUCTURA_DEFAULT;
    this.color = config.color ?? C.COLOR_DEFAULT;
    this.nivelColor = config.nivelColor ?? C.NIVEL_COLOR_DEFAULT;
    this.idProperty = config.idProperty ?? -1;
  }

  updateState() {
    //Obtiene el estado de Property
    return {
      nombre: this.nombre,
      precio: this.precio,
      baseAlquiler: this.baseAlquiler,
      nivelEstructura: this.nivelEstructura,
      color: this.color,
      nivelColor: this.nivelColor
    };
  }  
}

module.exports = Property;