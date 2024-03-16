import { Coordinate } from "./Coordinate.js";
import { Piece, color } from "./piece.js";
import { pieces } from "./pieces.js";

export const initialPieces = [
  new Piece(color.white, pieces.R, new Coordinate(0, 0)),
  new Piece(color.white, pieces.N, new Coordinate(1, 0)),
  new Piece(color.white, pieces.B, new Coordinate(2, 0)),
  new Piece(color.white, pieces.Q, new Coordinate(3, 0)),
  new Piece(color.white, pieces.K, new Coordinate(4, 0)),
  new Piece(color.white, pieces.B, new Coordinate(5, 0)),
  new Piece(color.white, pieces.N, new Coordinate(6, 0)),
  new Piece(color.white, pieces.R, new Coordinate(7, 0)),
  new Piece(color.white, pieces.P, new Coordinate(0, 1)),
  new Piece(color.white, pieces.P, new Coordinate(1, 1)),
  new Piece(color.white, pieces.P, new Coordinate(2, 1)),
  new Piece(color.white, pieces.P, new Coordinate(3, 1)),
  new Piece(color.white, pieces.P, new Coordinate(4, 1)),
  new Piece(color.white, pieces.P, new Coordinate(5, 1)),
  new Piece(color.white, pieces.P, new Coordinate(6, 1)),
  new Piece(color.white, pieces.P, new Coordinate(7, 1)),
  new Piece(color.black, pieces.P, new Coordinate(0, 6)),
  new Piece(color.black, pieces.P, new Coordinate(1, 6)),
  new Piece(color.black, pieces.P, new Coordinate(2, 6)),
  new Piece(color.black, pieces.P, new Coordinate(3, 6)),
  new Piece(color.black, pieces.P, new Coordinate(4, 6)),
  new Piece(color.black, pieces.P, new Coordinate(5, 6)),
  new Piece(color.black, pieces.P, new Coordinate(6, 6)),
  new Piece(color.black, pieces.P, new Coordinate(7, 6)),
  new Piece(color.black, pieces.R, new Coordinate(0, 7)),
  new Piece(color.black, pieces.N, new Coordinate(1, 7)),
  new Piece(color.black, pieces.B, new Coordinate(2, 7)),
  new Piece(color.black, pieces.Q, new Coordinate(3, 7)),
  new Piece(color.black, pieces.K, new Coordinate(4, 7)),
  new Piece(color.black, pieces.B, new Coordinate(5, 7)),
  new Piece(color.black, pieces.N, new Coordinate(6, 7)),
  new Piece(color.black, pieces.R, new Coordinate(7, 7)),
];

export const findPieceByCoordinate = (coordinate) => {
  return initialPieces.find((item) => {
    return (
      item.coordinate.x === coordinate.x && item.coordinate.y === coordinate.y
    );
  });
};
