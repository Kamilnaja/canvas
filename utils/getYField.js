import { config } from "../config.js";

export const getYField = (y) => {
  return config.fieldsCount - y - 1;
};
