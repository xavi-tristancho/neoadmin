import { unknownObject } from "@neoco/neoco-backoffice/src/types";
import { Field } from "../types";

type RemoveIfNotVisible = (item?: unknownObject) => (field?: Field) => boolean;

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
