import { unknownObject } from "@neoco/neoco-backoffice/src/types";
import { MultiSelectField, UnknownOption } from "./types";

type State = {
  data: { [key: string]: string };
  aux: { [key: string]: unknownObject[] };
};

type MultiSelectProps = {
  field: MultiSelectField;
  state: State;
  handleChange: ({
    target: { name, value },
  }: {
    target: { name: string; value: unknown };
  }) => void;
};

type MultiSelectOutput = {
  isMulti: boolean;
  getOptionLabel?: (option: UnknownOption) => string;
  value: string;
  options: string[] | UnknownOption[];
  onChange: (event: unknown, value: string) => void;
};

export const multiselect = ({
  field,
  state,
  handleChange,
}: MultiSelectProps): MultiSelectOutput => {
  const { relation } = field;

  const hasRemoteData =
    typeof relation.options === "undefined" &&
    typeof relation.name !== "undefined";

  return {
    isMulti: relation.isMulti,
    getOptionLabel: field.relation.format ? field.relation.format : undefined,
    value: state.data[field.property] || "",
    options: hasRemoteData ? state?.aux[relation.name] : relation.options,
    onChange: (_event, value) =>
      handleChange({ target: { name: field.property, value } }),
  };
};
