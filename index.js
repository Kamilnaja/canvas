const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

import { Coordinate } from "./Coordinate.js";
import { Path } from "./Path.js";
import { findPieceByCoordinate, initialPieces } from "./board.js";
import { config } from "./config.js";
import { game } from "./game.js";
import { Piece } from "./piece.js";
import { pieces } from "./pieces.js";
import { getFieldCoordinate } from "./utils/getFieldCoordinate.js";
import { getLetter } from "./utils/getLetter.js";
import { getYField } from "./utils/getYField.js";
import { doInDoubleLoop, doInSingleLoop } from "./utils/loop.utils.js";

const { fieldSize } = config;

const drawChessBoard = (ix, iy) => {
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

const drawPieces = () => {
  const { fieldSize, leftOffset } = config;

  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  initialPieces.forEach((piece) => {
    const { coordinate } = piece;
    ctx.fillText(
      piece?.actualSymbol || "",
      coordinate.x * fieldSize + fieldSize / 2 + leftOffset,
      getYField(coordinate.y) * fieldSize + fieldSize / 2
    );
  });
};

const drawNumbers = () => {
  const { fieldSize, fieldsCount } = config;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = "black";
  ctx.font = "30px Arial";

  doInSingleLoop((i) => {
    ctx.fillText(fieldsCount - i, 10, i * fieldSize + fieldSize / 2);
  });
};

const drawLetters = () => {
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  const { fieldSize, leftOffset, boardSize } = config;

  doInSingleLoop((i) => {
    ctx.fillText(
      getLetter(i).toUpperCase(),
      i * fieldSize + leftOffset + fieldSize / 2,
      boardSize + 30
    );
  });
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
  doInDoubleLoop((i, j) => {
    drawChessBoard(i, j);
    drawNumbers();
    drawLetters();
  });

  drawPieces();
};

document.getElementById("reset").addEventListener("click", () => {
  resetBoardToOnePieceOnly();
});

canvas.addEventListener("click", (e) => {
  const { x, y } = getFieldCoordinate(e);
  const { fieldsCount } = config;

  if (x < 0 || y < 0 || x >= fieldsCount || y >= fieldsCount) {
    return;
  }

  const piece = findPieceByCoordinate(new Coordinate(x, y));

  if (piece?.actualSymbol && game.countOfCorrectClicks === 0) {
    onFirstClick(x, y, fieldsCount);
  } else if (game.countOfCorrectClicks === 1) {
    onSecondClick(x, y);
  }
});

const redrawBoard = () => {
  ctx.clearRect(0, 0, config.ctxWidth, config.ctxHeight);
  init();
};

const drawMoves = (piece, x, y) => {
  const { fieldsCount, fieldSize, leftOffset } = config;
  switch (piece) {
    case "Rook":
      setPathsForRook(x, y, fieldsCount);
      game.drawPath(ctx, config);

      break;

    case "Bishop":
      doInDoubleLoop((i, j) => {
        ctx.fillStyle = "black";
        if (i === j) {
          ctx.beginPath();
          ctx.arc(
            (i + x) * fieldSize + fieldSize / 2 + leftOffset,
            j * fieldSize + fieldSize / 2,
            3,
            0,
            2 * Math.PI
          );
          ctx.fill();
        }
      });
      break;
  }
};

const onFirstClick = (x, y, fieldsCount) => {
  console.log("first click");
  strokeClickedField(x, y, fieldsCount);
  game.setChoosenField({ x, y });
  game.incrementNumberOfCorrectClicks();

  const piece = findPieceByCoordinate(new Coordinate(x, y));
  console.log("piece", piece);

  drawMoves(piece.name, x, y);
};

const onSecondClick = (x, y) => {
  const { y: y1, x: x1 } = game.choosenField;

  if (y1 === y && x1 === x) {
    console.log("cannot click the same field!!");
    return;
  }
  let found;

  for (const obj of game.getAllPathPoints()) {
    if (JSON.stringify(obj) === JSON.stringify({ x, y })) {
      found = true;
      break;
    }
  }

  if (found) {
    const matchingPiece = initialPieces.find((item) => {
      return item.coordinate.x === x1 && item.coordinate.y === y1;
    });
    console.log("found: ", matchingPiece);
    console.log("moving to", x, y);
    matchingPiece.coordinate = new Coordinate(x, y);
    redrawBoard();
    game.resetNumberOfCorrectClicks();
    game.resetPaths();
  } else {
    console.log("not possible");
  }
};

const resetBoardToOnePieceOnly = () => {
  initialPieces.length = 0;
  initialPieces.push(new Piece(1, pieces.R, new Coordinate(0, 0)));

  redrawBoard();
};

resetBoardToOnePieceOnly(); // todo - remove after testing rook moves
// init();

const setPathsForRook = (x, y, fieldsCount) => {
  game.addToPath(
    new Path(new Coordinate(x, y), new Coordinate(fieldsCount - 1, y))
  );
  game.addToPath(
    new Path(new Coordinate(x, y), new Coordinate(x, fieldsCount - 1))
  );
  game.addToPath(new Path(new Coordinate(x, y), new Coordinate(0, y)));
  game.addToPath(new Path(new Coordinate(x, y), new Coordinate(x, 0)));
};
