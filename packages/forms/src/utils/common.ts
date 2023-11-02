import { unknownObject } from "@app-artisans/backoffice/src/types";
import { Field } from "../types";

type RemoveIfNotVisible = (item?: unknownObject) => (field?: Field) => boolean;

export const isFunction = (prop: unknown) => typeof prop === "function";

export const removeIfNotVisible: RemoveIfNotVisible = (item) => (field) => {
  if (field) {
    const { upsertOptions: { show } = {} } = field;
    const isUndefined: boolean = typeof show === "undefined";
    const value: boolean = typeof show === "function" ? show(item) : show;

    return isUndefined ? true : value;
  } else {
    return true;
  }
};
