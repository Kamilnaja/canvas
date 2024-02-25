export class Piece {
  constructor(color, props) {
    this.color = color;
    this.symbol = props.symbol;
    this.name = props.name;
    this.actualSymbol = this.symbol[this.color];
  }
}
