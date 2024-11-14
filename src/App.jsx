import { ToastContainer } from "react-toastify";
import "./App.css";
import Board from "./components/TicTacToe/Board";
import useBool from "./hooks/useBool";

function App() {
  const [modalOpen, { on: openModal, off: closeModal }] = useBool(false);

  return (
    <>
      <dialog open={modalOpen}>
        <div className="header">
          <h1>Info</h1>
          <button className="close" onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              style={{ height: "1em", fill: "currentColor" }}
              role="button"
            >
              <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
            </svg>
          </button>
        </div>
        <div className="main">
          This app was #4 of my App-A-Day challenge, started on November 11,
          2024. Check out{" "}
          <a href="https://github.com/tmetcalfe89/klondike">the GitHub page</a>{" "}
          for more info.
        </div>
        <div className="footer">
          <button onClick={closeModal}>Close</button>
        </div>
      </dialog>

      <header>
        <h1>Tic Tac Toe</h1>
        <svg
          onClick={openModal}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          style={{ height: "1em", fill: "currentColor" }}
          role="button"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
      </header>
      <Board />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
