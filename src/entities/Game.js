const C = require('../constants/GameConstants');

class Game {
  constructor(config) {
    this.players = config.players ?? [];
    this.board = config.board ?? null;
    this.turno = config.idTurno ?? C.TURNO_INICIAL;
    this.gameFinalizado = config.gameFinalizado ?? false;
    this.gameComenzado = config.gameComenzado ?? false;
    this.idGame = config.idGame ?? -1;
  }

  joinGame(player) {
    this.players.push(player);
  }

  inicializarGame() { 
    if(!this.gameComenzado) {
        //Si el game no ha comenzado, quiere decir que es nuevo
        this.definirTurnos();
        this.gameComenzado = true;
    }
  }

  procesarAccion(idJugador, accion) {
    //Método encargado de ejecutar todas las acciones de los jugadores

  }

  definirTurnos() {
    const listaNum = [];
    for(let i=0;i<this.players.length;i++) {
      let num = this.players[i].lanzarDado();
      listaNum.push({player: this.players[i], num: num})
    }
    listaNum.sort((a, b) => {
      return b.num-a.num;
    });
    let ordenados = [];
    for(let i=0; i<listaNum.length;i++) {
      ordenados.push(listaNum[i].jugador);
    }
    this.players = ordenados;
  }
  updateState() {
    //Obtiene el estado del game
    return {
      turno: this.turno,
      gameFinalizado: this.gameFinalizado,
      gameComenzado: this.gameComenzado
    };
  }
}
module.exports = Game;