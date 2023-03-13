export const isFunction = (prop: unknown): boolean =>
  typeof prop === "function";

export const removeIfNotVisible: RemoveIfNotVisibleProps =
  (item) =>
  (field = {}) => {
    const { upsertOptions: { show } = {} } = field;
    const isUndefined: boolean = typeof show === "undefined";
    const value: unknown = isFunction(show) ? show(item) : show;

    return isUndefined ? true : value;
  };

type RemoveIfNotVisibleProps = (
  item: unknown
) => (
  field: { upsertOptions: { show: unknown } | unknown } | unknown
) => unknown;
