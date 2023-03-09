import { CSSObject } from "@emotion/react";
import { unknownObject } from "@neoco/neoco-backoffice/src/types";
import { MultiSelectField } from "./utils/inputs/multi-select/types";

export type DefaultField = {
  id?: string | number;
  required?: boolean;
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
  relation?: Relation;
  options?: Option[];
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
    })
  | MultiSelectField;

export type Option = {
  label?: string;
  value: string;
  default?: boolean;
  [key: string]: unknown;
};

export type Relation = {
  name: string;
  nameProps: string[];
  primaryKey: string;
};
