import {
  ModelUpsertState,
  unknownObject,
} from "@neoco/neoco-backoffice/src/types";
import { MultiSelectField } from "./utils/inputs/multi-select/types";
import { RelationListField } from "./utils/inputs/relation-list/types";

type OnChange = (target: {
  name: string;
  value: unknown;
}) => Promise<unknownObject>;

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
    filter?: (item: unknown) => string;
    isSearchable?: boolean;
  };
  upsertOptions?: {
    show?: ShowFn;
    value?: unknownObject;
    format?: (item: unknown) => string;
    onChange?: OnChange;
  };
  renderBefore?: () => JSX.Element;
  renderAfter?: () => JSX.Element;
  isValid?: (value: unknown) => unknown;
  relation?: Relation;
  options?: Option[];
  disabled?: DisabledFn;
};

export type ShowFn = boolean | ((item: unknownObject) => boolean);
export type DisabledFn =
  | boolean
  | (({ state, field }: { state: ModelUpsertState; field: Field }) => boolean);

export type Field =
  | (DefaultField & {
      type:
        | "text"
        | "image"
        | "date"
        | "html"
        | "checkbox"
        | "email"
        | "password";

      relation?: never;
    })
  | MultiSelectField
  | RelationListField;

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
