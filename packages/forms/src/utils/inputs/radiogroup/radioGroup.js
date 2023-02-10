export const radiogroup = ({ field, state, handleChange }) => {
  const { relation, property } = field;

  if (
    typeof relation === "undefined" &&
    (!field.options || field.options?.length === 0)
  ) {
    throw new Error(
      `You must define the relation or options prop in ${field.property}`
    );
  }

  const selectedOption = getSelectedOptions({ state, relation, property });

  const hasRemoteData = typeof field.options === "undefined";
  const isSelectedOptionAStringOrNumber =
    typeof selectedOption === "string" || typeof selectedOption === "number";

  const options = hasRemoteData
    ? getOptions({ state, ...relation })
    : field.options;

  const item = isSelectedOptionAStringOrNumber
    ? options.find((option) => option.value === selectedOption)
    : selectedOption;

  const value = item ? item?.value || item[relation?.primaryKey] : "";

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

const getSelectedOptions = ({ state, relation, property }) =>
  typeof state.data[relation?.name] === "undefined"
    ? state.data[property]
    : state.data[relation.name];

const getOptions = ({ state, name, nameProps, primaryKey = "id" }) => {
  return (
    state?.aux[name]?.map((item = {}) => ({
      value: item[primaryKey],
      label: getName({ item, nameProps }),
      ...item,
    })) || []
  );
};

const getName = ({ item, nameProps = [] }) =>
  Object.keys(item)
    .filter((key) => nameProps.includes(key))
    .map((key) => item[key])
    .join(" ");

export default radiogroup;
