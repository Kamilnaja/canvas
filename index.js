const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

import { board } from "./board.js";
import { config } from "./config.js";
import { getFieldCoordinate } from "./utils/getFieldCoordinate.js";
import { getLetter } from "./utils/getLetter.js";
const { fieldSize } = config;

const drawBoard = (ix, iy) => {
  const { leftOffset } = config;

  const colors = ["#f4f6f6", "#ba4a00"];
  const useColors = ix % 2 === 0 ? colors : [...colors.reverse()];
  ctx.fillStyle = useColors[iy % 2];
  ctx.fillRect(
    ix * fieldSize + leftOffset,
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

const drawNumbers = () => {
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";

  for (let i = 0; i < 8; i++) {
    ctx.fillText(
      8 - i,
      config.leftOffset / 3,
      i * fieldSize + fieldSize / 2 + config.verticalFieldsOffset
    );
  }
};

const drawLetters = () => {
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";

  for (let i = 0; i < 8; i++) {
    ctx.fillText(
      getLetter(i).toUpperCase(),
      i * fieldSize + fieldSize / 2 + 20,
      config.boardSize + 30
    );
  }
};

const init = () => {
  board.forEach((_, ix) => {
    board.forEach((_, iy) => {
      drawBoard(ix, iy);
      drawPieces(iy, ix);
      drawNumbers();
      drawLetters();
    });
  });
};

init();

canvas.addEventListener("click", (e) => {
  const { x, y } = getFieldCoordinate(e);
  console.log(x, y);
  const piece = board[y][x];
  console.log(piece);
});
