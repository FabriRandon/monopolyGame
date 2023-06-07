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
}
module.exports = Board;