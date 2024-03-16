export class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  equals(coordinate) {
    return this.x === coordinate.x && this.y === coordinate.y;
  }
}
