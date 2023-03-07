import { DefaultField, Option, Relation } from "@neoco/neoco-form/src/types";
import { unknownObject } from "@neoco/neoco-backoffice/src/types";

type RadioGroupInput = {
  field: DefaultField;
  state: unknownObject;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type RadioGroupOutput = {
  value: string;
  defaultValue?: string;
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const radiogroup = ({
  field,
  state,
  handleChange,
}: RadioGroupInput): RadioGroupOutput => {
  const { relation, property } = field;

  if (
    typeof relation === "undefined" &&
    (!field.options || field.options?.length === 0)
  ) {
    throw new Error(
      `You must define the relation or options prop in ${field.property}`
    );
  }

  const selectedOption: string = getSelectedOptions({
    state,
    relation,
    property,
  });

  const hasRemoteData = !!field.options;
  const isSelectedOptionAStringOrNumber: boolean =
    typeof selectedOption === "string" || typeof selectedOption === "number";

  const options: Option[] | [] = hasRemoteData
    ? getOptions({ state, ...relation })
    : field.options || [];

  const item: string | Option = isSelectedOptionAStringOrNumber
    ? options.find((option) => option.value === selectedOption) || ""
    : selectedOption;

  const value: string =
    typeof item !== "string"
      ? ""
      : ((item?.value || item[relation?.primaryKey]) as string);

  const defaultItem = options.find((option) => option.default);

  return {
    value,
    defaultValue: defaultItem?.value,
    options,
    onChange: (event) => {
      handleChange({
        target: {
          name: field.name || field.property,
          value: event.target.value,
        },
      });
    },
  };
};

const getSelectedOptions = ({
  state,
  relation,
  property,
}: {
  state: unknownObject;
  relation: Relation;
  property: string;
}): string =>
  state.data[relation?.name]
    ? (state.data[relation.name] as string)
    : (state.data[property] as string);

const getOptions = ({
  state,
  name,
  nameProps,
  primaryKey = "id",
}: {
  state: unknownObject;
  name: string;
  nameProps: string[];
  primaryKey: string;
}): Option[] | [] => {
  return (
    state?.aux[name]?.map((item = {}) => ({
      value: item[primaryKey],
      label: getName({ item, nameProps }),
      ...item,
    })) || []
  );
};

const getName = ({
  item,
  nameProps = [],
}: {
  item: string | Option;
  nameProps?: string[];
}): string =>
  Object.keys(item)
    .filter((key) => nameProps.includes(key))
    .map((key) => item[key])
    .join(" ");

export default radiogroup;
