import React from "react";

import Board from "../components/Board";
import SeeMe from "../components/SeeMe";

export default function TicTacToe({ location }) {
  return (
    <>
      <SeeMe location={location} />
      <Board />
    </>
  );
}
