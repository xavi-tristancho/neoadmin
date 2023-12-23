import { DefaultField } from "../../../types";

export type UnknownOption = { [key: string]: unknown };
type CommonRelationProps = { isMulti: boolean };

export type MultiSelectField<T = UnknownOption> =
  | (DefaultField & {
      type: "multiselect";
      relation: CommonRelationProps & {
        options?: string[];
        format?: never;
      };
    })
  | (DefaultField & {
      type: "multiselect";
      relation: CommonRelationProps & {
        options?: never;
        format: (option: T) => string;
      };
    })
  | (DefaultField & {
      type: "multiselect";
      relation: CommonRelationProps & {
        options?: T[];
        format: (option: T) => string;
      };
    });
