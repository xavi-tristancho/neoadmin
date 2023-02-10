export const isEmptyObject = (object) => {
  if (!object) return false;

  const isObject = object.constructor === Object;
  const isEmpty = Object.keys(object).length === 0;

  return isObject && isEmpty;
};
