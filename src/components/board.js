import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTicTacToeGame from "../hooks/TicTacToeGame";
import Cell from "./Cell";
import "./tictactoe.css";

export default function Board() {
  const { board, takeTurn, resetGameState } = useTicTacToeGame();

  return (
    <>
      <div className="board">
        {board.cells.map((row, rowI) => (
          <div className="row" key={`row-${rowI}`}>
            {row.map((cell, cellI) => (
              <Cell
                cell={cell}
                key={`cell-${rowI}-${cellI}`}
                onClick={(e) =>
                  takeTurn(
                    e.target.getAttribute("x"),
                    e.target.getAttribute("y")
                  )
                }
              />
            ))}
          </div>
        ))}
      </div>
      {board.gameOver && (
        <button className="reset" onClick={resetGameState}>
          Reset
        </button>
      )}
      <ToastContainer position="bottom-center" />
    </>
  );
}
