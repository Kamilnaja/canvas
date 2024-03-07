const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

import { game } from "./Game.js";
import { board } from "./board.js";
import { config } from "./config.js";
import { Piece } from "./piece.js";
import { pieces } from "./pieces.js";
import { getFieldCoordinate } from "./utils/getFieldCoordinate.js";
import { getLetter } from "./utils/getLetter.js";
import { getYField } from "./utils/getYField.js";

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

const strokeClickedField = (x, y, fieldsCount) => {
  ctx.lineWidth = 3;
  ctx.strokeStyle = "lime";

  ctx.strokeRect(
    x * fieldSize + config.leftOffset,
    (fieldsCount - y - 1) * fieldSize,
    fieldSize,
    fieldSize
  );
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

document.getElementById("reset").addEventListener("click", () => {
  resetBoardToRookOnly();
});

canvas.addEventListener("click", (e) => {
  const { x, y } = getFieldCoordinate(e);
  const { fieldsCount } = config;

  if (x < 0 || y < 0 || x >= fieldsCount || y >= fieldsCount) {
    return;
  }

  const piece = board[getYField(y)][x];

  if (piece?.actualSymbol && game.countOfCorrectClicks === 0) {
    onFirstClick(x, y, fieldsCount);
  } else if (game.countOfCorrectClicks === 1) {
    onSecondClick(y, x);
  }
});

const redrawBoard = () => {
  ctx.clearRect(0, 0, config.ctxWidth, config.ctxHeight);
  init();
};

const drawMoves = (piece) => {};

const onFirstClick = (x, y, fieldsCount) => {
  strokeClickedField(x, y, fieldsCount);
  game.setChoosenField({ x, y });
  game.incrementNumberOfCorrectClicks();

  const piece = board[getYField(y)][x];

  drawMoves(piece.name);
};

const onSecondClick = (y, x) => {
  const piece = board[getYField(game.choosenField.y)][game.choosenField.x];
  board[getYField(game.choosenField.y)][game.choosenField.x] = null;
  board[getYField(y)][x] = piece;
  redrawBoard();
  game.resetNumberOfCorrectClicks();
};

const resetBoardToRookOnly = () => {
  board.forEach((_, ix) => {
    board.forEach((_, iy) => {
      board[iy][ix] = null;
    });
  });

  board[3][3] = new Piece(1, pieces.R);

  redrawBoard();
};

resetBoardToRookOnly(); // todo - remove after testing rook moves
