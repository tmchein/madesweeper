import { useState } from "react";
import { COLORS } from "../board-config";
import { TILE_STATUSES } from "../utils/createBoard";

const Tile = ({ status, x, y, updateBoard }) => {
  // Create an useState for having each tile managing its own state
  // can have marked, revealed, mine or hidden status.

  // when clicking send the state to the board, so it will mutate the board
  // board[x][y].status

  const [tileStatus, setTileStatus] = useState(status);

  function handleClick(status, x, y) {
    setTileStatus(TILE_STATUSES.REVEALED);
    updateBoard({ tileStatus: TILE_STATUSES.REVEALED, x, y });
  }

  function handleRightClick(e) {
    e.preventDefault();
    setTileStatus(TILE_STATUSES.MARKED);
    updateBoard({ tileStatus: TILE_STATUSES.MARKED, x, y });
  }

  return (
    <button
      onClick={() => handleClick(status, x, y)}
      onContextMenu={handleRightClick}
      className={`font-bold text-center w-8 h-8 px-2 
      border-b-4 border-x-0 rounded-md bg-white ${COLORS[tileStatus]}`}
    >
      {tileStatus.slice(0, 1)}
    </button>
  );
};

export default Tile;
