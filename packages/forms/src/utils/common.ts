import { unknownObject } from "@neoco/neoco-backoffice/src/types";
import { Field } from "../types";

export const isFunction = (prop: unknown): boolean =>
  typeof prop === "function";

export const removeIfNotVisible =
  (item?: unknownObject) =>
  (field?: Field): boolean => {
    const { upsertOptions: { show } = {} } = field;
    const isUndefined: boolean = typeof show === "undefined";
    const value: boolean = typeof show === "function" ? show(item) : show;

    return isUndefined ? true : value;
  };
