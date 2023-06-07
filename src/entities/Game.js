const C = require('../../constants/GameConstants');

class Game {
  constructor(config) {
    this.players = config.players ?? [];
    this.board = config.board ?? null;
    this.turno = config.idTurno ?? C.TURNO_INICIAL;
    this.juegoFinalizado = config.juegoFinalizado ?? false;
    this.juegoComenzado = config.juegoComenzado ?? false;
    this.idGame = config.idGame ?? -1;

    if(config.players) {
        this.players.forEach(player => {
          player.idGame = this.idGame;
      });
    }
  }

  joinGame(player) {
    this.player.idGame = this.idGame;
    this.players.push(player);
  }

  inicializarGame() { 
    if(!this.juegoComenzado) {
        //Si el juego no ha comenzado, quiere decir que es nuevo
        this.definirTurnos();
        this.juegoComenzado = true;
    }
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
  getState() {
    //Obtiene el estado del juego
    return{
      players: this.players,
      board: this.board,
      turno: this.turno,
      juego: this.juegoFinalizado}
  }
}
module.exports = Game;