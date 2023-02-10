export const isFunction = (prop) => typeof prop === "function";

export const removeIfNotVisible =
  (item) =>
  (field = {}) => {
    const { upsertOptions: { show } = {} } = field;
    const isUndefined = typeof show === "undefined";
    const value = isFunction(show) ? show(item) : show;

    return isUndefined ? true : value;
  };
