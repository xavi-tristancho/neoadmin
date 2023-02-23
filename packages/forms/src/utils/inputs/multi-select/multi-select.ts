import { MultiSelectField, UnknownOption } from "./types";

type MultiSelectProps = {
  field: MultiSelectField;
  state: {
    data: {};
    aux: {};
  };
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
  onChange: (event, value) => void;
};

export const multiselect = ({
  field,
  state,
  handleChange,
}: MultiSelectProps): MultiSelectOutput => {
  const { relation } = field;

  if (typeof relation === "undefined") {
    throw new Error(
      `You must define the relation prop in ${field.property} when using multiselect controls`
    );
  }

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
