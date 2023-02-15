export const getMultiSelectProps = ({ field, state }) => {
  const { relation } = field;
  const options = getOptions({ state, ...relation });

  return {
    options,
  };
};

export const getSingleSelectProps = ({ field, state, handleChange }) => {
  const { relation, property } = field;
  const selectedOption = getSelectedOptions({ state, relation, property });

  const hasRemoteData = typeof relation.options === "undefined";
  const isSelectedOptionAStringOrNumber =
    typeof selectedOption === "string" || typeof selectedOption === "number";

  const options = hasRemoteData
    ? getOptions({ state, ...relation })
    : relation.options;

  const item = isSelectedOptionAStringOrNumber
    ? options.find((option) => option.value === selectedOption)
    : selectedOption;

  const value = item ? getSingleValue({ item, ...relation }) : "";

  return {
    value,
    options,
    onChange: (incomingItem) =>
      handleChange({
        target: {
          name: field.name || field.property,
          value: incomingItem,
        },
      }),
  };
};

export const getOptions = ({ state, name, nameProps, primaryKey = "id" }) =>
  state?.aux[name]?.map((item = {}) => {
    const isString = typeof item === "string";
    const optionValue = isString ? item : item[primaryKey];
    const optionLabel = isString ? item : getName({ item, nameProps });
    return {
      value: optionValue,
      label: optionLabel,
      ...(isString ? {} : item),
    };
  }) || [];

export const getSingleValue = ({ item, nameProps, primaryKey = "id" }) => ({
  value: item?.value || item[primaryKey],
  label: item?.label || getName({ item, nameProps }),
  ...item,
});

const getSelectedOptions = ({ state, relation, property }) =>
  typeof state.data[relation.name] === "undefined"
    ? state.data[property]
    : state.data[relation.name];

const getName = ({ item, nameProps = [] }) =>
  Object.keys(item)
    .filter((key) => nameProps.includes(key))
    .map((key) => item[key])
    .join(" ");
