import { DefaultField } from "../../../types";

type Option = { [key: string]: unknown };
type CommonRelationProps = { isMulti: boolean };

export type MultiSelectField =
  | (DefaultField & {
      type: "multiselect";
      relation: CommonRelationProps & {
        name?: never;
        options?: string[];
        getOptionLabel?: never;
      };
    })
  | (DefaultField & {
      type: "multiselect";
      relation: CommonRelationProps & {
        name: string;
        options?: never;
        getOptionLabel: (option: Option) => string;
      };
    })
  | (DefaultField & {
      type: "multiselect";
      relation: CommonRelationProps & {
        name?: never;
        options?: Option[];
        getOptionLabel: (option: Option) => string;
      };
    });
