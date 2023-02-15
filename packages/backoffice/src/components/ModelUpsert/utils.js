import formats from "./formats";

export const beforeSave = ({ header, state }) => {
  const { data } = state;
  const fields = header.sections.reduce(
    (reducer, { fields }) => [...reducer, ...fields],
    []
  );

  return Object.keys(data).reduce((reducer, key) => {
    return reducer.then((nextData) => {
      const field = fields.find(({ property }) => property === key);
      const { type } = field ? field : {};

      if (type) {
        const fieldBeforeSave =
          field?.upsertOptions?.beforeSave || defaultBeforeSave;

        const params = {
          headers: header,
          beforeSave: fieldBeforeSave,
          field,
          key,
          data,
          nextData,
        };

        const format =
          typeof fieldBeforeSave === "function" && type === "image"
            ? formats[type]
            : formats["defaultBeforeSave"];

        if (typeof format === "function") {
          return format(params).then((data) => ({ ...nextData, ...data }));
        } else {
          return Promise.resolve({ ...nextData, [key]: data[key] });
        }
      } else {
        return Promise.resolve(nextData);
      }
    });
  }, Promise.resolve(data));
};

const defaultBeforeSave = ({ state, field }) =>
  state[field.name || field.property];
