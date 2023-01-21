import { BOARD_CONFIG } from "./board-config";
import Board from "./components/Board";

function App() {
  return (
    <main>
      <h1 className="underline text-3xl">madesweeper</h1>
      <Board
        boardSize={BOARD_CONFIG.boardSize}
        numberOfMines={BOARD_CONFIG.numOfMines}
      />
    </main>
  );
}

export default App;
