import {
  ModelUpsertState,
  unknownObject,
} from "@app-artisans/backoffice/src/types";
import { MultiSelectField } from "./utils/inputs/multi-select/types";
import { RelationListField } from "./utils/inputs/relation-list/types";

type OnChange = (target: {
  name: string;
  value: unknown;
}) => Promise<unknownObject>;

export type DefaultField<Entity = null> = {
  id?: string | number;
  required?: boolean;
  label?: string;
  property?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  sx?: unknownObject;
  tableOptions?: {
    show?: ShowFn;
    format?: (args: {
      row: Entity;
      data: unknownObject[];
      field: Field<Entity>;
    }) => JSX.Element | Element;
    filter?: (item: unknown) => string;
    isSearchable?: boolean;
  };
  upsertOptions?: {
    show?: ShowFn;
    value?: unknownObject;
    format?: (item: unknown) => string;
    onChange?: OnChange;
    beforeSave?: ({
      state,
      field,
    }: {
      state: ModelUpsertState;
      field: Field<Entity>;
    }) => unknownObject;
  };
  renderBefore?: () => JSX.Element;
  renderAfter?: () => JSX.Element;
  isValid?: (value: unknown) => unknown;
  relation?: Relation;
  options?: Option[];
  disabled?: DisabledFn;
  icon?: JSX.Element;
};

export type ShowFn = boolean | ((item: unknownObject[]) => boolean);
export type DisabledFn =
  | boolean
  | (({ state, field }: { state: ModelUpsertState; field: Field }) => boolean);

export type Field<Entity = null> =
  | (DefaultField<Entity> & {
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

type Option = {
  label?: string;
  value: string;
  default?: boolean;
  [key: string]: unknown;
};

type Relation = {
  name: string;
  nameProps: string[];
  primaryKey: string;
};
