import { getMinesPositions } from "./mines";

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
  for (let y = 0; y < boardSize; y++) {
    let row = [];
    for (let x = 0; x < boardSize; x++) {
      const tile = {
        status: TILE_STATUSES.HIDDEN,
        x,
        y,
      };
      row.push(tile);
    }
    board.push(row);
  }

  return board;
}
