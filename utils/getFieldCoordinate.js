import { config } from "./../config.js";

export const getFieldCoordinate = (e) => {
  const { offsetX, offsetY } = e;
  const { leftOffset, fieldSize } = config;

  const x = Math.floor((offsetX - leftOffset) / fieldSize);
  const y = Math.floor(8 - offsetY / fieldSize);
  return { x, y };
};
