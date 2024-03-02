import { Piece } from "./piece.js";
import { pieces } from "./pieces.js";

export const board = [
  [
    new Piece(0, pieces.R),
    new Piece(0, pieces.N),
    new Piece(0, pieces.B),
    new Piece(0, pieces.Q),
    new Piece(0, pieces.K),
    new Piece(0, pieces.B),
    new Piece(0, pieces.N),
    new Piece(0, pieces.R),
  ],
  [
    new Piece(0, pieces.P),
    new Piece(0, pieces.P),
    new Piece(0, pieces.P),
    new Piece(0, pieces.P),
    new Piece(0, pieces.P),
    new Piece(0, pieces.P),
    new Piece(0, pieces.P),
    new Piece(0, pieces.P),
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    new Piece(1, pieces.P),
    new Piece(1, pieces.P),
    new Piece(1, pieces.P),
    new Piece(1, pieces.P),
    new Piece(1, pieces.P),
    new Piece(1, pieces.P),
    new Piece(1, pieces.P),
    new Piece(1, pieces.P),
  ],
  [
    new Piece(1, pieces.R),
    new Piece(1, pieces.N),
    new Piece(1, pieces.B),
    new Piece(1, pieces.Q),
    new Piece(1, pieces.K),
    new Piece(1, pieces.B),
    new Piece(1, pieces.N),
    new Piece(1, pieces.R),
  ],
];
