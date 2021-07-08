import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cell from "./cell";

const NO_PLAYER = "-";
const PLAYER_1 = "X";
const PLAYER_2 = "O";

export default function Board() {
  const [boardData, setBoardData] = useState([
    [NO_PLAYER, NO_PLAYER, NO_PLAYER],
    [NO_PLAYER, NO_PLAYER, NO_PLAYER],
    [NO_PLAYER, NO_PLAYER, NO_PLAYER],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(NO_PLAYER);
  const [winner, setWinner] = useState(NO_PLAYER);

  const changeCell = (x, y, value) => {
    if (boardData[y][x] !== NO_PLAYER) return;
    let clonedBoardData = [...boardData];
    clonedBoardData[y][x] = value;
    setBoardData(clonedBoardData);
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
  };

  const takeTurn = (x, y) => {
    if (winner !== NO_PLAYER) return;
    changeCell(x, y, currentPlayer);
  };

  const checkForWinner = () => {
    // Rows
    for (let y = 0; y < 3; y++) {
      let winnerSearch = boardData[y][0];
      console.log(winnerSearch);
      for (let x = 1; x < 3; x++) {
        if (boardData[y][x] !== winnerSearch) {
          winnerSearch = NO_PLAYER;
        }
      }
      if (winnerSearch !== NO_PLAYER) {
        return setWinner(winnerSearch);
      }
    }
    // Columns
    for (let x = 0; x < 3; x++) {
      let winnerSearch = boardData[0][x];
      for (let y = 1; y < 3; y++) {
        if (boardData[y][x] !== winnerSearch) {
          winnerSearch = NO_PLAYER;
        }
      }
      if (winnerSearch !== NO_PLAYER) {
        return setWinner(winnerSearch);
      }
    }
    // Diagonals
    if (
      boardData[0][0] === boardData[1][1] &&
      boardData[0][0] === boardData[2][2]
    ) {
      return setWinner(boardData[0][0]);
    }
    if (
      boardData[0][2] === boardData[1][1] &&
      boardData[0][2] === boardData[2][0]
    ) {
      return setWinner(boardData[0][2]);
    }
  };

  useEffect(() => {
    changePlayer();
    checkForWinner();
  }, [boardData]);

  useEffect(() => {
    if (winner === NO_PLAYER) return;
    toast(`${winner} has won!`);
  }, [winner]);

  return (
    <div>
      {boardData.map((row, rowI) => (
        <div className="row" key={`row-${rowI}`}>
          {row.map((cell, cellI) => (
            <Cell
              value={cell}
              key={`cell-${rowI}-${cellI}`}
              x={cellI}
              y={rowI}
              onClick={(e) =>
                takeTurn(e.target.getAttribute("x"), e.target.getAttribute("y"))
              }
            />
          ))}
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}
