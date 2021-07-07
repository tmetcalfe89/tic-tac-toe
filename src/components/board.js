import { useState } from "react";
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
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);

  const takeTurn = (x, y) => {
    changeCell(x, y, currentPlayer);
    changePlayer();
  };

  const changeCell = (x, y, value) => {
    console.log(x);
    console.log(y);
    let clonedBoardData = [...boardData];
    clonedBoardData[y][x] = value;
    setBoardData(clonedBoardData);
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
  };

  return boardData.map((row, rowI) => (
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
  ));
}
