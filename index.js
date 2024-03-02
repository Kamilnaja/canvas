const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

import { board } from "./board.js";
import { config } from "./config.js";

const drawBoard = (ix, iy) => {
  const colors = ["#f4f6f6", "#ba4a00"];
  const useColors = ix % 2 === 0 ? colors : [...colors.reverse()];
  ctx.fillStyle = useColors[iy % 2];
  ctx.fillRect(
    ix * config.fieldSize,
    iy * config.fieldSize,
    config.fieldSize,
    config.fieldSize
  );
};

const drawPieces = (iy, ix) => {
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  const piece = board[iy][ix];
  ctx.fillText(
    piece?.actualSymbol || "",
    ix * config.fieldSize + config.fieldSize / 2 - 15,
    iy * config.fieldSize + config.fieldSize / 2 + 15
  );
};

const init = () => {
  board.forEach((_, ix) => {
    board.forEach((_, iy) => {
      drawBoard(ix, iy);
      drawPieces(iy, ix);
    });
  });
};

init();
