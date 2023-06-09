class Board {
  constructor(config) {
    this.squares = config.squares ?? null;
    this.idBoard = config.idBoard ?? -1;
  }
  agregarSquare(square) {
    this.squares.push(square);
  }
  eliminarSquare(square) {
    let index = this.squares.indexOf(square);
    index !== -1 ? this.casillas.splice(index, 1) : "";
  }

  moverPlayer(player, players) {
    let valorMov = player.lanzarDado();
    player.moverPlayer(valorMov);
  }

  updateState() {
    //Obtiene el estado del game
    return {
      id: this.idBoard,
    };
  }
}
module.exports = Board;