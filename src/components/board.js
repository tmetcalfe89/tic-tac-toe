import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTicTacToeGame from "../hooks/TicTacToeGame";
import Cell from "./Cell";
import "./tictactoe.css";

export default function Board() {
  const { boardData, NO_PLAYER, takeTurn, winner, resetGameState } =
    useTicTacToeGame();

  return (
    <>
      <div className="board">
        {boardData.map((row, rowI) => (
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
      {winner !== NO_PLAYER && (
        <button className="reset" onClick={resetGameState}>
          Reset
        </button>
      )}
      <ToastContainer position="bottom-center" />
    </>
  );
}
