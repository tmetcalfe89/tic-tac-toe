import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTicTacToeGame from "../../hooks/useTicTacToeGame";
import Cell from "./Cell";
import "./Board.css";

export default function Board() {
  const { board, takeTurn, resetGameState } = useTicTacToeGame({
    notify: toast,
  });

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
