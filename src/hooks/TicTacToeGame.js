import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const NO_PLAYER = "-";
const TIE_PLAYER = "Nobody";
const PLAYER_1 = "X";
const PLAYER_2 = "O";

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

class Board {
  constructor(cells) {
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
    return this;
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
}

export default function useTicTacToeGame() {
  const [board, setBoard] = useState(new Board());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);

  const changeCell = (x, y, value) => {
    if (board.getCell(x, y).taken) return;
    setBoard(board.setCell(x, y, value));
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
  };

  const takeTurn = (x, y) => {
    if (board.winner !== NO_PLAYER) return;
    changeCell(x, y, currentPlayer);
    changePlayer();
  };

  const resetGameState = () => {
    setBoard(new Board());
    setCurrentPlayer(PLAYER_1);
    toast("Game reset");
  };

  useEffect(() => {
    console.log(board.winner);
    if (board.winner === NO_PLAYER) return;
    toast(`${board.winner} has won!`);
  }, [board.winner]);

  return {
    NO_PLAYER,
    boardData: board.cells,
    winner: board.winner,
    takeTurn,
    resetGameState,
  };
}
