import { Coordinate } from "./Coordinate.js";
import { Path } from "./Path.js";
import { initialPieces } from "./board.js";
import { config } from "./config.js";
import { getYField } from "./utils/getYField.js";

export const paths = {
  paths: [],
  addToPath(path) {
    this.paths.push(path);
  },
  resetPaths() {
    this.paths = [];
  },
  logPath() {
    for (let i = 0; i < this.paths.length; i++) {
      console.log(this.paths[i]);
    }
  },
  getAllPathPoints() {
    return this.paths.reduce((res, path) => {
      if (path.start.x === path.end.x) {
        if (path.start.y < path.end.y) {
          for (let i = path.start.y; i <= path.end.y; i++) {
            res.add(new Coordinate(path.start.x, i));
          }
        } else {
          for (let i = path.end.y; i <= path.start.y; i++) {
            res.add(new Coordinate(path.start.x, i));
          }
        }
      } else {
        if (path.start.x < path.end.x) {
          for (let i = path.start.x; i <= path.end.x; i++) {
            res.add(new Coordinate(i, path.start.y));
          }
        } else {
          for (let i = path.end.x; i <= path.start.x; i++) {
            res.add(new Coordinate(i, path.start.y));
          }
        }
      }
      return res;
    }, new Set());
  },
  drawPath(ctx, config) {
    const { leftOffset, pathWidth, fieldSize } = config;
    ctx.fillStyle = "magenta";
    this.getAllPathPoints().forEach((item) => {
      ctx.fillRect(
        leftOffset + fieldSize * item.x + fieldSize / 2,
        getYField(item.y) * fieldSize + fieldSize / 2,
        pathWidth,
        pathWidth
      );
    });
  },

  setPathsForRook(piece) {
    const { x, y } = piece.coordinate;
    const otherPieces = initialPieces.filter((item) => {
      return item.coordinate.x !== x || item.coordinate.y !== y;
    });

    const otherPiece = otherPieces[0];

    evaluateCollisions(otherPiece, piece);
  },
};

const evaluateCollisions = (otherPiece, piece) => {
  const { fieldsCount } = config;
  const isSameColor = piece.color === otherPiece.color;
  const { x, y } = piece.coordinate;

  const handleTheSameX = () => {
    console.log("the same x", console.log("y", y));

    if (otherPiece.coordinate.y < y) {
      console.log("less y");
      let endFieldY = isSameColor
        ? otherPiece.coordinate.y + 1
        : otherPiece.coordinate.y;

      paths.addToPath(new Path({ x, y }, { x, y: fieldsCount - 1 }));
      paths.addToPath(new Path({ x, y }, { x, y: endFieldY }));
    } else {
      console.log("more y");

      let endFieldY = isSameColor
        ? otherPiece.coordinate.y - 1
        : otherPiece.coordinate.y;

      paths.addToPath(new Path({ x, y }, { x, y: endFieldY }));
      paths.addToPath(new Path({ x, y }, { x, y: 0 }));
    }
  };

  const handleTheSameY = () => {
    paths.addToPath(new Path({ x, y }, { x, y: 0 }));
    paths.addToPath(new Path({ x, y }, { x, y: fieldsCount - 1 }));

    if (otherPiece.coordinate.x < x) {
      let endFieldX = isSameColor
        ? otherPiece.coordinate.x + 1
        : otherPiece.coordinate.x;

      paths.addToPath(new Path({ x, y }, { x: fieldsCount - 1, y }));
      paths.addToPath(new Path({ x, y }, { x: endFieldX, y: fieldsCount - 1 }));
    } else {
      let endFieldX = isSameColor
        ? otherPiece.coordinate.x - 1
        : otherPiece.coordinate.x;

      paths.addToPath(new Path({ x, y }, { x: endFieldX, y }));
      paths.addToPath(new Path({ x, y }, { x: endFieldX, y: fieldsCount - 1 }));
    }
  };

  const handleNoCollisions = () => {
    paths.addToPath(new Path({ x, y }, { x: 0, y }));
    paths.addToPath(new Path({ x, y }, { x: fieldsCount - 1, y }));

    // y
    paths.addToPath(new Path({ x, y }, { x, y: 0 }));
    paths.addToPath(new Path({ x, y }, { x, y: fieldsCount - 1 }));
  };

  // check nearest pieces
  if (otherPiece.coordinate.x === x) {
    handleTheSameX();
  } else if (otherPiece.coordinate.y === y) {
    handleTheSameY(x, y, fieldsCount, otherPiece, piece);
  } else {
    handleNoCollisions();
  }
};
