import { config } from "./../config.js";

export const getFieldCoordinate = (e) => {
  const { offsetX, offsetY } = e;
  const { leftOffset, fieldSize, fieldsCount } = config;

  const x = Math.floor((offsetX - leftOffset) / fieldSize);
  const y = Math.floor(fieldsCount - offsetY / fieldSize);
  return { x, y };
};
