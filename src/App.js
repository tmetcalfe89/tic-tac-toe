import { BrowserRouter, Route, Switch } from "react-router-dom";
import TicTacToe from "./pages/TicTacToe";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/tic-tac-toe" exact component={TicTacToe} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
