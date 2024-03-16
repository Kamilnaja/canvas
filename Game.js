import { Coordinate } from "./Coordinate.js";
import { getYField } from "./utils/getYField.js";

export const game = {
  countOfCorrectClicks: 0,
  choosenField: null,
  paths: [],

  incrementNumberOfCorrectClicks() {
    this.countOfCorrectClicks++;
  },
  resetNumberOfCorrectClicks() {
    this.countOfCorrectClicks = 0;
  },
  setChoosenField(piece) {
    this.choosenField = piece;
  },
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
    const res = new Set();
    this.paths.forEach((path) => {
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
    });
    return res;
  },
  drawPath(ctx, config) {
    const { leftOffset, pathWidth, fieldSize } = config;

    this.getAllPathPoints().forEach((item) => {
      ctx.fillRect(
        leftOffset + fieldSize * item.x + fieldSize / 2,
        getYField(item.y) * fieldSize + fieldSize / 2,
        pathWidth,
        pathWidth
      );
    });
  },
};

const drawPath = (path, ctx, config) => {
  const { leftOffset, pathWidth, fieldSize } = config;

  this.getAllPathPoints().forEach((item) => {
    console.log(item);
    ctx.fillRect(
      leftOffset + fieldSize * path.start.x + fieldSize / 2,
      getYField(item.y) * fieldSize + fieldSize / 2,
      pathWidth,
      pathWidth
    );
  });

  if (path.start.x === path.end.x) {
    if (path.start.y < path.end.y) {
      for (let i = path.start.y; i <= path.end.y; i++) {
        ctx.fillRect(
          leftOffset + fieldSize * path.start.x + fieldSize / 2,
          getYField(i) * fieldSize + fieldSize / 2,
          pathWidth,
          pathWidth
        );
      }
    } else {
      for (let i = path.end.y; i <= path.start.y; i++) {
        ctx.fillRect(
          leftOffset + fieldSize * path.start.x + fieldSize / 2,
          getYField(i) * fieldSize + fieldSize / 2,
          pathWidth,
          pathWidth
        );
      }
    }
  } else {
    if (path.start.x < path.end.x) {
      for (let i = path.start.x; i <= path.end.x; i++) {
        ctx.fillRect(
          leftOffset + fieldSize * i + fieldSize / 2,
          getYField(path.start.y) * fieldSize + fieldSize / 2,
          pathWidth,
          pathWidth
        );
      }
    } else {
      for (let i = path.end.x; i <= path.start.x; i++) {
        ctx.fillRect(
          leftOffset + fieldSize * i + fieldSize / 2,
          getYField(path.start.y) * fieldSize + fieldSize / 2,
          pathWidth,
          pathWidth
        );
      }
    }
  }
};
