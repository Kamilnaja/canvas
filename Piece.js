export class Piece {
  constructor(color, props, coordinate) {
    this.color = color;
    this.coordinate = coordinate;
    this.symbols = props.symbol;
    this.name = props.name;
    this.actualSymbol = this.symbols[this.color];
  }
}

export const color = {
  white: 1,
  black: 0,
};
