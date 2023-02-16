import { MultiSelectField } from "./types";

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

export const multiselect = ({
  field,
  state,
  handleChange,
}: MultiSelectProps) => {
  const { relation } = field;

  if (typeof relation === "undefined") {
    throw new Error(
      `You must define the relation prop in ${field.property} when using multiselect controls`
    );
  }

  const hasRemoteData = typeof relation.options === "undefined";

  return {
    ...field.relation,
    getOptionLabel: field.relation.format ? field.relation.format : undefined,
    value: state.data[field.property] || "",
    options: hasRemoteData ? state?.aux[relation.name] : relation.options,
    onChange: (event, value) =>
      handleChange({ target: { name: field.property, value } }),
  };
};
