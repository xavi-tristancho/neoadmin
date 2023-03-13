type RemoveIfNotVisibleProps2 = (
  item?: unknown
) => (field?: { upsertOptions?: { show?: unknown } }) => unknown;

export const isFunction = (prop: unknown): boolean =>
  typeof prop === "function";

export const removeIfNotVisible: RemoveIfNotVisibleProps2 =
  (item) =>
  (field = {}) => {
    const { upsertOptions: { show } = {} } = field;
    const isUndefined: boolean = typeof show === "undefined";
    const value: unknown = isFunction(show) ? show(item) : show;

    return isUndefined ? true : value;
  };
