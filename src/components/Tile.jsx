import { COLORS } from "../board-config";
import { nearbyTiles, TILE_STATUSES } from "../utils/createBoard";

const Tile = ({ status, x, y, updateBoard, mine, board, label }) => {
  // Create an useState for having each tile managing its own state
  // can have marked, revealed, mine or hidden status.

  // when clicking send the state to the board, so it will mutate the board
  // board[x][y].status

  function handleClick(status, x, y) {
    if (status === TILE_STATUSES.MARKED) return;

    if (mine) {
      updateBoard({ tileStatus: TILE_STATUSES.MINE, label: "", x, y });
      return;
    }

    updateBoard({ tileStatus: TILE_STATUSES.REVEALED, label: "", x, y });

    const adjacentTiles = nearbyTiles(board, { x, y });
    const mines = adjacentTiles.filter((t) => t.mine);

    console.log({ adjacentTiles, mines });

    if (mines.length === 0) {
      // adjacentTiles.forEach((tile) => {
      //   handleClick(TILE_STATUSES.REVEALED, tile.x, tile.y);
      //   // updateBoard({ tileStatus: TILE_STATUSES.REVEALED, label: "", x, y });
      // });
    } else {
      updateBoard({
        tileStatus: TILE_STATUSES.REVEALED,
        label: mines.length,
        x,
        y,
      });
    }
  }

  function handleRightClick(e) {
    e.preventDefault();
    if (status === TILE_STATUSES.REVEALED || status === TILE_STATUSES.MINE) {
      return;
    }
    if (status === TILE_STATUSES.MARKED) {
      updateBoard({ tileStatus: TILE_STATUSES.HIDDEN, label: "", x, y });
      return;
    }
    updateBoard({ tileStatus: TILE_STATUSES.MARKED, label: "🏳️", x, y });
  }

  return (
    <button
      onClick={() => handleClick(status, x, y)}
      onContextMenu={handleRightClick}
      className={`font-bold text-center w-8 h-8 px-2 
      border-b-4 border-x-0 rounded-md bg-white ${COLORS[status]}`}
    >
      {label}
    </button>
  );
};

export default Tile;
