const C = require('../constants/GameConstants');
const PossessionFilter = require('../utils/PossessionFilter');

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
    this.recargarTurnos();
    this.board.recargarBoard();
    let playerTurno = this.players[this.turno];

    if (this.gameComenzado && playerTurno.id === idPlayerSolicitando) {
      switch (playerTurno.seccionActual) {
        case C.SECCIONES.MENU_PRINCIPAL:
          if (accion == C.MPOPTIONS.MOVER_MAPA && !playerTurno.isMovBoard) {
            console.log("\nMoviendose en el mapa!!\n");
            this.board?.moverPlayer(playerTurno, this.players);
            playerTurno.isMovBoard = true;
          } else if (accion == C.MPOPTIONS.CONSTRUIR_CASA) {
            console.log("\nSe ha elegido construir una casa!!\n");
            playerTurno.seccionActual = C.SECCIONES.MENU_ACCION_CONSTRUIR_CASA;
            console.log(playerTurno.obtenerPossessions(this.board.squares, PossessionFilter.construibles));
          } else if (accion == C.MPOPTIONS.HIPOTECAR_CASA) {
            console.log("\nSe ha elegido hipotecar una casa!!\n");
            playerTurno.seccionActual = C.SECCIONES.MENU_ACCION_HIPOTECAR_CASA;
            console.log(playerTurno.obtenerPossessions(this.board.squares, PossessionFilter.conEstructurasHipotecables));
          } else if (accion == C.MPOPTIONS.HIPOTECAR_POSESION) {
            console.log("\nSe ha elegido hipotecar una posesion!!\n");
            playerTurno.seccionActual = C.SECCIONES.MENU_ACCION_HIPOTECAR_POSESION;
            console.log(playerTurno.obtenerPossessions(this.board.squares, PossessionFilter.hipotecables));
          } else if (accion == C.MPOPTIONS.DESHIPOTECAR_POSESION) {
            console.log("\nSe ha elegido deshipotecar una posesion!!\n");
            playerTurno.seccionActual = C.SECCIONES.MENU_ACCION_DESHIPOTECAR_POSESION;
            console.log(playerTurno.obtenerPossessions(this.board.squares, PossessionFilter.hipotecados));
          } else if (accion == C.MPOPTIONS.TERMINAR_TURNO && playerTurno.isMovBoard) {
            console.log("\nTerminando el turno!!\n");
            this.turno += 1;
            playerTurno.isMovBoard = false;
          }
          break;
        case C.SECCIONES.MENU_COMPRAR_APROPIABLE:
          if (accion == C.MCOPTIONS.COMPRAR) {
            console.log("\nComprar propiedad\n");
            let possessionComprar = this.board.squares[playerTurno.squareActual];
            playerTurno.comprarPossession(possessionComprar);
            playerTurno.seccionActual = C.SECCIONES.MENU_PRINCIPAL;
          } else if (accion == C.MCOPTIONS.NOCOMPRAR) {
            console.log("\nNO comprar propiedad\n");
            playerTurno.seccionActual = C.SECCIONES.MENU_PRINCIPAL;
          }
          break;
        case C.SECCIONES.MENU_ACCION_CONSTRUIR_CASA:
          console.log("\nEl jugador ha decidido construir una casa\n");
          playerTurno.construirEstructuraPorID(accion, this.board.squares);
          playerTurno.seccionActual = C.SECCIONES.MENU_PRINCIPAL;
          break;
        case C.SECCIONES.MENU_ACCION_HIPOTECAR_CASA:
          console.log("\nEl jugador ha decidido hipotecar una casa\n");
          playerTurno.hipotecarEstructuraPorID(accion, this.board.squares);
          playerTurno.seccionActual = C.SECCIONES.MENU_PRINCIPAL;
          break;
        case C.SECCIONES.MENU_ACCION_HIPOTECAR_POSESION:
          console.log("\nEl jugador ha decidido hipotecar una posesion\n");
          playerTurno.hipotecarPosesionPorID(accion, this.board.squares);
          playerTurno.seccionActual = C.SECCIONES.MENU_PRINCIPAL;
          break;
        case C.SECCIONES.MENU_ACCION_DESHIPOTECAR_POSESION:
          console.log("\nEl jugador ha decidido deshipotecar una posesion\n");
          playerTurno.deshipotecarPosesionPorID(accion, this.board.squares);
          playerTurno.seccionActual = C.SECCIONES.MENU_PRINCIPAL;
          break;
      }

    }
  }


  recargarTurnos() {
    let alivePlayers = [];
    for(let i = 0; i < this.players.length; i++) {
      if(!this.players[i].bancarrota) {
        alivePlayers.push(this.players[i]);
      }
    }
    this.players = alivePlayers;
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