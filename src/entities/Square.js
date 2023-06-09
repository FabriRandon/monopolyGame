class Square {
  constructor(config) {
    this.nombre = config.nombre ?? 'sin nombre';
  }
  realizarAccion() {
    //Los hijos implementan la accion a su manera
  }

  updateState() {
    //Obtiene el estado de Property
    return {
      nombre: this.nombre,
    };
  }  
}

module.exports = Square;