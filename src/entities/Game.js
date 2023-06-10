const C = require('../constants/GameConstants');

class Game {
  constructor(config) {
    this.players = config.players ?? [];
    this.board = config.board ?? null;
    this.turno = config.turno ?? C.TURNO_INICIAL;
    this.gameFinalizado = config.gameFinalizado ?? false;
    this.gameComenzado = config.gameComenzado ?? false;
    this.id = config.id ?? -1;
  }

  joinGame(player) {
    if (!this.gameComenzado) {
      this.players.push(player);
    }
  }

  inicializarGame() {
      this.definirTurnos();
      this.gameComenzado = true;
  }

  procesarAccion(idPlayerSolicitando, accion) {
    //Método encargado de ejecutar todas las acciones de los jugadores
    this.recargarTurnos();
    this.board.recargarBoard();
    let playerTurno = this.players[this.turno];
    if (this.gameComenzado && playerTurno.id === idPlayerSolicitando) {
      if (playerTurno.seccionActual === C.SECCIONES.MENU_PRINCIPAL) {
        if (accion == C.MPOPTIONS.MOVER_MAPA && !playerTurno.isMovBoard) {
          console.log("\nMoviendose en el mapa!!\n");
          if (this.board) {
            this.board.moverPlayer(playerTurno, this.players);
          }
          playerTurno.isMovBoard = true;
        }
        else if (accion == C.MPOPTIONS.CONSTRUIR_CASA) {
          console.log("\nConstruyendo una casa!!\n");
        }
        else if (accion == C.MPOPTIONS.HIPOTECAR_CASA) {
          console.log("\nHipotecando una casa!!\n");
        }
        else if (accion == C.MPOPTIONS.HIPOTECAR_POSESION) {
          console.log("\nHipotecando una posesion!!\n");
        }
        else if (accion == C.MPOPTIONS.DESHIPOTECAR_POSESION) {
          console.log("\nDeshipotecando una posesion!!\n");
        }
        else if (accion == C.MPOPTIONS.TERMINAR_TURNO && playerTurno.isMovBoard) {
          console.log("\nTerminando el turno!!\n");
          this.turno += 1;
          playerTurno.isMovBoard = false;
        }
      }
      else if (playerTurno.seccionActual === C.SECCIONES.MENU_COMPRAR_APROPIABLE) {
        if (accion == C.MCOPTIONS.COMPRAR) {
          //El jugador decide comprar la propiedad
          console.log("\nComprar propiedad\n");
          let possessionComprar = this.board.squares[playerTurno.squareActual];
          playerTurno.comprarPossession(possessionComprar);
          playerTurno.seccionActual = C.SECCIONES.MENU_PRINCIPAL;
        }
        else if (accion == C.MCOPTIONS.NOCOMPRAR) {
          //El jugador decide NO comprar la propiedad
          console.log("\nNO comprar propiedad\n");
        }
      }
    }
  }

  recargarTurnos() {
    this.players.sort((a, b) => {
      return a.numTurno - b.numTurno;
    })
    while (this.turno >= this.players.length) {
      this.turno -= this.players.length;
    }
  }

  definirTurnos() {
    const listaNum = [];
    for (let i = 0; i < this.players.length; i++) {
      let num = this.players[i].lanzarDado();
      listaNum.push({ player: this.players[i], num: num })
    }
    listaNum.sort((a, b) => {
      return b.num - a.num;
    });
    let ordenados = [];
    for (let i = 0; i < listaNum.length; i++) {
      listaNum[i].player.numTurno = i;
      ordenados.push(listaNum[i].player);
    }
    this.players = ordenados;
    this.recargarTurnos();
  }
  updateState() {
    //Obtiene el estado del game
    return {
      turno: this.turno,
      gameFinalizado: this.gameFinalizado,
      gameComenzado: this.gameComenzado,
    };
  }
}
module.exports = Game;