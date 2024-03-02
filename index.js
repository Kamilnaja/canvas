const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

import { board } from "./board.js";
import { config } from "./config.js";
const { fieldSize } = config;

const drawBoard = (ix, iy) => {
  const { leftOffset } = config;

  const colors = ["#f4f6f6", "#ba4a00"];
  const useColors = ix % 2 === 0 ? colors : [...colors.reverse()];
  ctx.fillStyle = useColors[iy % 2];
  ctx.fillRect(
    ix * fieldSize + config.leftOffset,
    iy * fieldSize,
    fieldSize,
    fieldSize
  );
};

const drawPieces = (iy, ix) => {
  const { fieldSize, verticalFieldsOffset, leftOffset } = config;

  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  const piece = board[iy][ix];
  ctx.fillText(
    piece?.actualSymbol || "",
    ix * fieldSize + fieldSize / 2 - verticalFieldsOffset + leftOffset,
    iy * fieldSize + fieldSize / 2 + verticalFieldsOffset
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
