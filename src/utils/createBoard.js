import { getMinesPositions, positionMatch } from "./mines";

export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  REVEALED: "revealed",
  MARKED: "marked",
};

export function createBoard(boardSize, numberOfMines) {
  let board = [];
  const minePositions = getMinesPositions(boardSize, numberOfMines);

  console.log("MINE POSITIONS", minePositions);
  for (let x = 0; x < boardSize; x++) {
    let row = [];
    for (let y = 0; y < boardSize; y++) {
      const tile = {
        x,
        y,
        status: TILE_STATUSES.HIDDEN,
        label: "",
        mine: minePositions.some((p) => positionMatch(p, { x, y })),
      };
      row.push(tile);
    }
    board.push(row);
  }

  return board;
}

export function nearbyTiles(board, { x, y }) {
  const tiles = [];

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[x + xOffset]?.[y + yOffset];
      if (tile) tiles.push(tile);
    }
  }

  return tiles;
}

export function revealTile(board, tile) {
  const { x, y, status } = tile;
  if (tile.status !== TILE_STATUSES.HIDDEN) {
    return;
  }

  if (tile.mine) {
    tile.status = TILE_STATUSES.MINE;
    return;
  }

  tile.status = TILE_STATUSES.REVEALED;

  const adjacentTiles = nearbyTiles(board, { x, y });
  const mines = adjacentTiles.filter((t) => t.mine);

  if (mines.length === 0) {
    adjacentTiles.forEach(revealTile.bind(null, board));
  } else {
    tile.label = mines.length;
  }

  return board;
}
