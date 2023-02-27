import { unknownObject } from "../types";

export const isEmptyObject = (object: unknownObject): boolean => {
  if (!object) return false;

  const isObject = object.constructor === Object;
  const isEmpty = Object.keys(object).length === 0;

  return isObject && isEmpty;
};
