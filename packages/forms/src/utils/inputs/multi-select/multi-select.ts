import { MultiSelectField, UnknownOption } from "./types";

type MultiSelectProps = {
  field: MultiSelectField;
  state: {
    data: unknown;
    aux: unknown;
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
  const { relation, property } = field;

  if (typeof relation === "undefined") {
    throw new Error(
      `You must define the relation prop in ${property} when using multiselect controls`
    );
  }

  const hasRemoteData =
    typeof relation.options === "undefined" &&
    typeof relation.name !== "undefined";

  return {
    isMulti: relation.isMulti,
    getOptionLabel: relation.format ? relation.format : undefined,
    value: (state.data[property] || "") as string,
    options: (hasRemoteData ? state?.aux[relation.name] : relation.options) as
      | string[]
      | UnknownOption[],
    onChange: (_event, value: unknown) =>
      handleChange({ target: { name: property, value } }),
  };
};
