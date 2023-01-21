import React, { useState } from "react";
import { createBoard } from "../utils/createBoard";
import Tile from "./Tile";

const Board = ({ boardSize, numberOfMines }) => {
  const [board, setBoard] = useState(() =>
    createBoard(boardSize, numberOfMines)
  );

  console.log({ board });

  const updateBoard = ({ tileStatus, label, x, y }) => {
    setBoard((previousBoard) => {
      const newBoard = [...previousBoard];
      newBoard[x][y].status = tileStatus;
      newBoard[x][y].label = label;
      return newBoard;
    });
  };

  return (
    <div
      className="bg-[#DDEEDC] inline-grid p-3 gap-1 rounded-lg"
      style={{
        gridTemplateColumns: `repeat(${boardSize}, minmax(0,1fr))`,
        gridTemplateRows: `repeat(${boardSize}, minmax(0,1fr))`,
      }}
    >
      {board.map((row) => {
        return row.map((tile) => {
          return (
            <Tile
              updateBoard={updateBoard}
              board={board}
              mine={tile.mine}
              key={`position-${tile.x}-${tile.y}}`}
              x={tile.x}
              y={tile.y}
              label={tile.label}
              status={tile.status}
            />
          );
        });
      })}
    </div>
  );
};

export default Board;
