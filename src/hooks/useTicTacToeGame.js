import { useState, useEffect } from "react";

import board from "../logic/Board";

const NO_PLAYER = "-";
const TIE_PLAYER = "Nobody";
const PLAYER_1 = "X";
const PLAYER_2 = "O";
const X_CELLS = 3;
const Y_CELLS = 3;

const Board = board({
  NO_PLAYER,
  TIE_PLAYER,
  PLAYER_1,
  PLAYER_2,
  X_CELLS,
  Y_CELLS,
});

export default function useTicTacToeGame({ notify }) {
  const [board, setBoard] = useState(new Board());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);

  const changeCell = (x, y, value) => {
    if (board.getCell(x, y).taken) return false;
    board.setCell(x, y, value);
    return true;
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
  };

  const takeTurn = (x, y) => {
    if (board.winner !== NO_PLAYER) return;
    if (changeCell(x, y, currentPlayer)) {
      changePlayer();
    }
  };

  const resetGameState = () => {
    setBoard(new Board());
    setCurrentPlayer(PLAYER_1);
    notify("Game reset");
  };

  useEffect(() => {
    if (board.winner === NO_PLAYER) return;
    notify(`${board.winner} has won!`);
  }, [board.winner]);

  return {
    board,
    takeTurn,
    resetGameState,
  };
}
