import { DefaultField, Field } from "@neoco/neoco-form/src/types";
import { MultiSelectField } from "@neoco/neoco-form/src/utils/inputs/multi-select/types";

export type Column = {
  property?: string;
  label?: string;
  name?: string;
};

export type OperatorOptions = {
  value?: string;
  label?: string;
};

export type Filter = {
  columnField: OperatorOptions;
  operatorValue: OperatorOptions;
  value: string;
};

export type FilterField = {
  property: string;
  type: "relation-list";
  CustomDeleteIcon: () => JSX.Element;
  lineContainerStyles: { borderBottom: "none" };
  options: {
    isCreatable: true;
    fields: MultiSelectField[] | Field[];
  };
} & DefaultField;

export type FilterSection = {
  fields: FilterField[];
};
