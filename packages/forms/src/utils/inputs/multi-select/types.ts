import { AutocompleteProps } from "@mui/material";

export type UnknownOption = { [key: string]: unknown };

type PartialAutocompleteProps = Partial<
  AutocompleteProps<
    UnknownOption,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined
  >
>;

export type MultiSelectField =
  | (PartialAutocompleteProps & {
      type: "multiselect";
      relation: {
        name?: never;
        options?: string[];
        format?: never;
      };
    })
  | (PartialAutocompleteProps & {
      type: "multiselect";
      relation: {
        name: string;
        options?: never;
        format: (option: UnknownOption) => string;
      };
    })
  | (PartialAutocompleteProps & {
      type: "multiselect";
      relation: {
        name?: never;
        options?: UnknownOption[];
        format: (option: UnknownOption) => string;
      };
    });
