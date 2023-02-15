export const multiselect = ({ field, state, handleChange }) => {
  const { relation } = field;
  const { isMulti } = relation;

  if (typeof relation === "undefined") {
    throw new Error(
      `You must define the relation prop in ${field.property} when using multiselect controls`
    );
  }

  const hasRemoteData = typeof relation.options === "undefined";

  return {
    isMulti,
    value: state.data[field.property] || "",
    options: hasRemoteData ? state?.aux[relation.name] : relation.options,
    onChange: (event, value) =>
      handleChange({ target: { name: field.property, value } }),
  };
};
