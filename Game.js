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
  drawPaths(ctx, config) {
    this.paths.forEach((item) => {
      drawPath(item, ctx, config);
    });
  },
};

const drawPath = (path, ctx, config) => {
  const { leftOffset, pathWidth, fieldSize } = config;
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
