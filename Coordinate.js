import { config } from "./config.js";

export class Coordinate {
  constructor(x, y) {
    if (x < 0 || y < 0) {
      throw new Error("Coordinate cannot be negative");
    }
    if (x > config.boardSize || y > config.boardSize) {
      throw new Error("Coordinate cannot be greater than 7");
    }

    this.x = x;
    this.y = y;
  }
  equals(coordinate) {
    return this.x === coordinate.x && this.y === coordinate.y;
  }
}
