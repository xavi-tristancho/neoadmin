import { Field } from "@app-artisans/form/src/types";
import { ModelUpsertState, Header } from "../../types";
import formats from "./formats";

export const beforeSave = ({
  header,
  state,
}: {
  header: Header;
  state: ModelUpsertState;
}) => {
  const { data } = state;
  const fields: Field[] | [] = header.sections.reduce(
    (reducer, { fields }) => [...reducer, ...fields],
    []
  );

  return Object.keys(data).reduce((reducer, key) => {
    return reducer.then((nextData) => {
      const field = fields.find(({ property }) => property === key);
      const { type } = field;

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
    });
  }, Promise.resolve(data));
};

const defaultBeforeSave = ({
  state,
  field,
}: {
  state: ModelUpsertState;
  field: Field;
}): unknown => state[field.name || field.property];
