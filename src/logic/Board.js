function Board({ NO_PLAYER, TIE_PLAYER, PLAYER_1, PLAYER_2 }) {
  class Cell {
    constructor(x, y) {
      this.value = NO_PLAYER;
      this.x = x;
      this.y = y;
    }

    get taken() {
      return this.value !== NO_PLAYER;
    }
  }

  return class Board {
    constructor(PLAYERS, cells) {
      this.cells =
        cells ||
        new Array(3)
          .fill()
          .map((e, y) => new Array(3).fill().map((e, x) => new Cell(x, y)));
    }

    getCell(x, y) {
      return this.cells[y][x];
    }

    getVal(x, y) {
      return this.getCell(x, y).value;
    }

    setCell(x, y, value) {
      this.getCell(x, y).value = value;
    }

    get winner() {
      // Rows
      for (let y = 0; y < 3; y++) {
        let winnerSearch = this.getVal(0, y);
        for (let x = 1; x < 3; x++) {
          if (this.getVal(x, y) !== winnerSearch) {
            winnerSearch = NO_PLAYER;
          }
        }
        if (winnerSearch !== NO_PLAYER) {
          return winnerSearch;
        }
      }
      // Columns
      for (let x = 0; x < 3; x++) {
        let winnerSearch = this.getVal(x, 0);
        for (let y = 1; y < 3; y++) {
          if (this.getVal(x, y) !== winnerSearch) {
            winnerSearch = NO_PLAYER;
          }
        }
        if (winnerSearch !== NO_PLAYER) {
          return winnerSearch;
        }
      }
      // Diagonals
      if (
        this.getVal(0, 0) === this.getVal(1, 1) &&
        this.getVal(0, 0) === this.getVal(2, 2)
      ) {
        return this.getVal(0, 0);
      }
      if (
        this.getVal(0, 2) === this.getVal(1, 1) &&
        this.getVal(0, 2) === this.getVal(2, 0)
      ) {
        return this.getVal(0, 2);
      }
      // Tie
      if (
        this.cells.reduce(
          (rowCount, row) =>
            row.reduce(
              (cellCount, cell) => (cell.taken ? cellCount + 1 : cellCount),
              0
            ) === 3
              ? rowCount + 1
              : rowCount,
          0
        ) === 3
      ) {
        return TIE_PLAYER;
      }
      return NO_PLAYER;
    }

    get gameOver() {
      return this.winner === PLAYER_1 || this.winner === PLAYER_2;
    }
  };
}

export default Board;
