import { isFunction } from "./common";

const defaultFormat = ({ state, field }) =>
  state.data[field.name || field.property];

export const getFromat = ({ field }) =>
  field.upsertOptions?.format || defaultFormat;

const defaultHandleChange =
  (handleChange) =>
  ({ target: { name, value } }) => {
    handleChange({ [name?.length ? name : field.property]: value });
  };

export const getHandleChange = ({ field, handleChange }) =>
  field.upsertOptions?.onChange
    ? ({ target: { name, value } }) => {
        Promise.resolve(field.upsertOptions?.onChange({ name, value })).then(
          handleChange
        );
      }
    : defaultHandleChange(handleChange);

export const getDisabled = ({ field, state }) => {
  const { disabled = false } = field;

  return isFunction(disabled) ? disabled({ field, state }) : disabled;
};
