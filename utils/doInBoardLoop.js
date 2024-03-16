import { config } from "../config.js";

export const doInBoardLoop = (callback) => {
  const { fieldsCount } = config;
  for (let i = 0; i < fieldsCount; i++) {
    for (let j = 0; j < fieldsCount; j++) {
      callback(i, j);
    }
  }
};
