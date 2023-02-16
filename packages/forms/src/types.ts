import { MultiSelectField } from "./utils/inputs/multi-select/types";

export type DefaultField = {
  label?: string;
  property: string;
  name?: string;
  style?: {},
  tableOptions?: {
    show?: false;
    format?: (item: unknown) => string
  };
};

export type Field =
  | (DefaultField & {
      type: "text" | "image" | "date" | "html" | "checkbox";
      relation?: never;
    })
  | MultiSelectField;
