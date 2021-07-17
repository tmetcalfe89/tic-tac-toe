import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import board from "../logic/Board";

const NO_PLAYER = "-";
const TIE_PLAYER = "Nobody";
const PLAYER_1 = "X";
const PLAYER_2 = "O";

const Board = board({ NO_PLAYER, TIE_PLAYER, PLAYER_1, PLAYER_2 });

export default function useTicTacToeGame() {
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
    toast("Game reset");
  };

  useEffect(() => {
    if (board.winner === NO_PLAYER) return;
    toast(`${board.winner} has won!`);
  }, [board.winner]);

  return {
    board,
    takeTurn,
    resetGameState,
  };
}
