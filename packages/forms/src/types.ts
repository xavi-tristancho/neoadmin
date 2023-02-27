import { unknownObject } from "@neoco/neoco-backoffice/src/types";
import { MultiSelectField } from "./utils/inputs/multi-select/types";

export type DefaultField = {
  id?: string | number;
  label?: string;
  property?: string;
  name?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  sx?: unknownObject;
  tableOptions?: {
    show?: ShowFn;
    format?: (item: unknown) => string;
  };
  upsertOptions?: {
    value?: unknownObject;
  };
  renderBefore?: () => JSX.Element;
  renderAfter?: () => JSX.Element;
  isValid?: (value: unknown) => unknown;
};

export type ShowFn = boolean | ((item: unknownObject[]) => boolean);

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
      required?: boolean;
    })
  | MultiSelectField;
