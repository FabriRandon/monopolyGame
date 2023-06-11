const C = require('../constants/GameConstants');
const Possession = require('./Possession');
const PossessionFilter = require('../utils/PossessionFilter');

class Player {
  constructor(config) {
    this.nombre = config.nombre ?? 'sin nombre';
    this.dinero = config.dinero ?? C.DINERO_INICIAL;
    this.bancarrota = config.bancarrota ?? false;
    this.squareActual = config.squareActual ?? C.SQUARE_INICIAL;
    this.id = config.id ?? -1;
    this.numTurno = config.numTurno ?? -1;
    this.isMovBoard = config.isMovBoard ?? false;
    this.seccionActual = config.seccionActual ?? C.SECCIONES.MENU_PRINCIPAL;
  }
  lanzarDado() {
    return Math.floor(Math.random() * C.DADOS_MAX_VALOR)
      + C.DADOS_MIN_VALOR;
  }

  obtenerPossessions(possessions, filtro = null) {
    let listaPossessions = []
    for (let pos of possessions) {
      if (pos instanceof Possession && pos.idPlayer === this.id) {
        if (!filtro || filtro(pos)) {
          listaPossessions.push(pos);
        }
      }
    }
    return listaPossessions;
  }

  moverEnBoard(cantidad, longitudBoard) {
    this.squareActual += cantidad
    while (this.squareActual >= longitudBoard) {
      this.squareActual -= longitudBoard;
    }
  }

  transferirDinero(player, monto) {
    let transferido = Math.min(this.dinero, monto);
    let faltante = monto - transferido;
    player.dinero += transferido;
    this.dinero -= transferido;
    return { transferido, faltante };
  }
  declararBancarrotaRentas(propietario, possessions) {
    this.bancarrota = true;
    this.transferirAllPossessions(propietario, possessions);
  }
  transferirAllPossessions(nuevoPropietario, possessions) {
    let possPlayer = this.obtenerPossessions(possessions);
    for(let poss of possPlayer) {
      this.transferirPossession(nuevoPropietario, poss);
    }
  }
  transferirPossession(nuevoPropietario, possession) {
    possession.idPlayer = nuevoPropietario.id;
  }

  pagarRenta(propietario, possessions, monto) {

    let datosTransaccion = this.transferirDinero(propietario, monto);
    console.log(datosTransaccion);
    while (datosTransaccion.faltante > 0 &&
      this.obtenerPossessions(possessions, PossessionFilter.noHipotecados).length > 0) {
      
      console.log(datosTransaccion);
      this.hipotecarAutomatico(possessions);
      datosTransaccion = this.transferirDinero(propietario, datosTransaccion.faltante);
    }
    if(datosTransaccion.faltante > 0) {
      this.declararBancarrotaRentas(propietario, possessions);
    }
  }

  hipotecarEstructurasAuto(possessions) {
    let propEstructuras = this.obtenerPossessions(possessions, PossessionFilter.conEstructuras);
    if (propEstructuras.length > 0) {
      propEstructuras.sort((a, b) => {
        return b.nivelEstructura - a.nivelEstructura;
      });
      propEstructuras[0].hipotecarEstructura(this);
      return true;
    }
    return false;
  }

  hipotecarPossessionsAuto(possessions) {
    let possHipotecables = this.obtenerPossessions(possessions, PossessionFilter.hipotecables);
    if (possHipotecables.length > 0) {
      possHipotecables.sort((a,b) => {
        return a.precio - b.precio;
      })
      possHipotecables[0].hipotecar(this);
      return true;
    }
    return false;
  }

  hipotecarAutomatico(possession) {
    if (this.hipotecarEstructurasAuto(possession)) {
      return true;
    }
    else if (this.hipotecarPossessionsAuto(possession)) {
      return true;
    }
    return false;
  }
  hipotecarEstructuraPorID(idPossession, squares) {
    let possessions = this.obtenerPossessions(squares, PossessionFilter.conEstructuras);
    console.log("\n" + possessions + "\n");
    for (let possession of possessions) {
      if (possession.id == idPossession) {
        possession.hipotecarEstructura(this);
        return true;
      }
    }
    return false;
  }
  construirEstructuraPorID(idPossession, squares) {
    let possessions = this.obtenerPossessions(squares, PossessionFilter.construibles);
    console.log("\n" + possessions + "\n");
    for (let possession of possessions) {
      if (possession.id == idPossession) {
        possession.construirEstructura(this);
        return true;
      }
    }
    return false;
  }
  hipotecarPosesionPorID(idPossession, squares) {
    let possessions = this.obtenerPossessions(squares, PossessionFilter.hipotecables);
    console.log("\n" + possessions + "\n");
    for (let possession of possessions) {
      if (possession.id == idPossession) {
        possession.hipotecar(this);
        return true;
      }
    }
    return false;
  }
  deshipotecarPosesionPorID(idPossession, squares) {
    let possessions = this.obtenerPossessions(squares, PossessionFilter.hipotecados);
    console.log("\n" + possessions + "\n");
    for (let possession of possessions) {
      if (possession.id == idPossession) {
        possession.deshipotecar(this);
        return true;
      }
    }
    return false;
  }

  comprarPossession(possession) {
    if(this.dinero >= possession.precio) {
      this.dinero -= possession.precio;
      possession.idPlayer = this.id;
      console.log("El jugador " + this.nombre + " ha comprado el apropiable a un precio de $" + possession.precio + ", ahora el jugador tiene: $" + this.dinero + " de saldo")
      return true;
    }
    console.log("El jugador " + this.nombre + " NO tiene saldo suficiente para comprar el apropiable");
    return false;
  }

  updateState() {
    //Obtiene el estado del game
    return {
      nombre: this.nombre,
      dinero: this.dinero,
      bancarrota: this.bancarrota,
      squareActual: this.squareActual,
      numTurno: this.numTurno,
      isMovBoard: this.isMovBoard,
      seccionActual: this.seccionActual
    };
  }
}
module.exports = Player;