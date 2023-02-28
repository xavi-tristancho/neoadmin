import { unknownObject } from "@neoco/neoco-backoffice/src/types";
import { MultiSelectField } from "./utils/inputs/multi-select/types";

export type DefaultField = {
  id?: string | number;
  label?: string;
  property?: string;
  name?: string;
  placeholder?: string;
  style?: object;
  sx?: unknownObject;
  tableOptions?: {
    show?: false;
    format?: (item: unknown) => string;
  };
  upsertOptions?: {
    value?: unknownObject;
  };
};

export type Field =
  | (DefaultField & {
      type:
        | "text"
        | "image"
        | "date"
        | "html"
        | "checkbox"
        | "email"
        | "password"
        | "relation-list";

      relation?: never;
    })
  | MultiSelectField;
