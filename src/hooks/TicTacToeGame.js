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

export default function useTicTacToeGame() {
  const generateBlankBoard = () =>
    new Array(3)
      .fill()
      .map((e, y) => new Array(3).fill().map((e, x) => new Cell(x, y)));

  const [boardData, setBoardData] = useState(generateBlankBoard());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState(NO_PLAYER);

  const changeCell = (x, y, value) => {
    if (boardData[y][x].value !== NO_PLAYER) return;
    let clonedBoardData = [...boardData];
    clonedBoardData[y][x].value = value;
    setBoardData(clonedBoardData);
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
  };

  const takeTurn = (x, y) => {
    if (winner !== NO_PLAYER) return;
    changeCell(x, y, currentPlayer);
    changePlayer();
  };

  const checkForWinner = () => {
    // Rows
    for (let y = 0; y < 3; y++) {
      let winnerSearch = boardData[y][0].value;
      for (let x = 1; x < 3; x++) {
        if (boardData[y][x].value !== winnerSearch) {
          winnerSearch = NO_PLAYER;
        }
      }
      if (winnerSearch !== NO_PLAYER) {
        return setWinner(winnerSearch);
      }
    }
    // Columns
    for (let x = 0; x < 3; x++) {
      let winnerSearch = boardData[0][x].value;
      for (let y = 1; y < 3; y++) {
        if (boardData[y][x].value !== winnerSearch) {
          winnerSearch = NO_PLAYER;
        }
      }
      if (winnerSearch !== NO_PLAYER) {
        return setWinner(winnerSearch);
      }
    }
    // Diagonals
    if (
      boardData[0][0].value === boardData[1][1].value &&
      boardData[0][0].value === boardData[2][2].value
    ) {
      return setWinner(boardData[0][0].value);
    }
    if (
      boardData[0][2].value === boardData[1][1].value &&
      boardData[0][2].value === boardData[2][0].value
    ) {
      return setWinner(boardData[0][2].value);
    }
    checkForTie();
  };

  const checkForTie = () => {
    if (
      boardData.reduce(
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
      setWinner(TIE_PLAYER);
    }
  };

  const resetGameState = () => {
    setBoardData(generateBlankBoard());
    setCurrentPlayer(PLAYER_1);
    toast("Game reset");
  };

  useEffect(() => {
    checkForWinner();
  }, [boardData]);

  useEffect(() => {
    if (winner === NO_PLAYER) return;
    toast(`${winner} has won!`);
  }, [winner]);

  return { boardData, NO_PLAYER, takeTurn, winner, resetGameState };
}
