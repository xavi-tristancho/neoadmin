import { DefaultField, Field } from "@app-artisans/form/src/types";
import { MultiSelectField } from "@app-artisans/form/src/utils/inputs/multi-select/types";
import { Section } from "@app-artisans/backoffice/src/types";

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
  operatorValue: OperatorOptions | OperatorOptions[];
  value: string;
};

export type FilterField =
  | {
      property: string;
      type: string;
      CustomDeleteIcon: () => JSX.Element;
      lineContainerStyles: { borderBottom: "none" };
      options: {
        isCreatable: true;
        fields: MultiSelectField[] | Field[];
      };
    } & DefaultField;

export type FilterSection = {
  fields: FilterField[];
} & Section;
