class Square {
  constructor(config) {
    this.nombre = config.nombre ?? 'sin nombre';
    this.id = config.id ?? -1;
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