const C = require('../constants/GameConstants');
const Possession = require('./Possession');

class Property extends Possession {
  constructor(config) {
    super(config);
    this.baseAlquiler = config.baseAlquiler ?? C.BASE_ALQUILER_DEFAULT;
    this.nivelEstructura = config.nivelEstructura ?? C.NIVEL_ESTRUCTURA_DEFAULT;
    this.color = config.color ?? C.COLOR_DEFAULT;
    this.nivelColor = config.nivelColor ?? C.NIVEL_COLOR_DEFAULT;
  }

  verificarColores(squares) {
    let countAllInstances = 0;
    let countPlayerInstances = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] instanceof Property && squares[i].color === this.color) {
        countAllInstances++;
        if (this.idPlayer === squares[i].idPlayer) {
          countPlayerInstances++;
        }
      }
    }
    return countAllInstances == countPlayerInstances
  }

  realizarAccion(player, players, squares) {
    console.log("\n Has caido en la casilla: " + this.nombre + "\n");

    let propietario = super.revisarPropietario(players, squares);
    console.log(propietario);

    if (propietario && propietario.id === player.id) {
      //Caso 1: Si la propiedad tiene propietario y es del jugador de turno
      console.log("\nEl jugador " + player.nombre + " ha caido en su propiedad\n");
    }
    else if (propietario && propietario.id !== player.id) {
      //Caso 2: Si la propiedad tiene propietario y es de otro jugador
      console.log("El jugador " + player.nombre + " ha caido en la propiedad de " + propietario.nombre);

      if (!this.hipotecado) {
        let monto = this.calcularAlquiler(squares);
        player.pagarRenta(propietario, squares, monto);
      }
      else {
        console.log("La propiedad se encuentra hipotecada");
      }
    }
    else if (!propietario) {
      //Caso 3: Si la propiedad no tiene propietario, se puede comprar
      console.log("El jugador " + player.nombre + " ha caido en una propiedad del banco");
      player.seccionActual = C.SECCIONES.MENU_COMPRAR_APROPIABLE;
    }
  }

  hipotecarEstructura(player) {
    if (this.nivelEstructura > 0 && this.idPlayer == player.id) {
      let montoHipoteca = this.calcularHipotecaEstructura();
      this.nivelEstructura -= 1;
      player.dinero += montoHipoteca;
      return true;
    }
    return false;
  }

  precioEstructura() {
    return this.precio <= C.PRECIOS_CONSTRUIR.B1.MENORA ? C.PRECIOS_CONSTRUIR.B1.PRECIO :
      this.precio <= C.PRECIOS_CONSTRUIR.B2.MENORA ? C.PRECIOS_CONSTRUIR.B2.PRECIO :
        this.precio <= C.PRECIOS_CONSTRUIR.B3.MENORA ? C.PRECIOS_CONSTRUIR.B3.PRECIO :
          this.precio <= C.PRECIOS_CONSTRUIR.B4.MENORA ? C.PRECIOS_CONSTRUIR.B4.PRECIO :
            C.PRECIOS_CONSTRUIR.DEFAULT.PRECIO;
  }

  construirEstructura(player) {
    if (player.dinero >= this.precioEstructura() && this.idPlayer == player.id &&
      this.nivelEstructura <= C.NIVEL_MAX_ESTRUCTURA) {
      player.dinero -= this.precioEstructura();
      this.nivelEstructura += 1;
      console.log("El jugador " + player.nombre + " ha subido al nivel " + this.nivelEstructura + " la propiedad " + this.nombre + ", saldo: $" + player.dinero);
      return true;
    }
    return false;
  }

  calcularAlquiler(squares) {
    let allColors = this.verificarColores(squares)
    let alquiler = this.baseAlquiler;
    if (allColors && this.nivelEstructura == 0) return Math.floor(alquiler * 2);
    if (this.nivelEstructura >= 1) alquiler *= (4 + 1 / this.baseAlquiler);
    if (this.nivelEstructura >= 2) alquiler *= (3 + 1 / this.baseAlquiler);
    if (this.nivelEstructura >= 3) alquiler *= (2.5 + 1 / this.baseAlquiler);
    if (this.nivelEstructura >= 4) alquiler *= (1.4 + 1 / this.baseAlquiler);
    if (this.nivelEstructura >= 5) alquiler *= (1.2 + 1 / this.baseAlquiler);


    return Math.floor(alquiler);
  }

  calcularHipotecaEstructura() {
    return this.precioEstructura() * C.FACTOR_HIPOTECA;
  }

  updateState() {
    //Obtiene el estado de Property
    return {
      nombre: this.nombre,
      precio: this.precio,
      baseAlquiler: this.baseAlquiler,
      nivelEstructura: this.nivelEstructura,
      color: this.color,
      nivelColor: this.nivelColor,
      hipotecado: this.hipotecado,
      idPlayer: this.idPlayer
    };
  }
}

module.exports = Property;