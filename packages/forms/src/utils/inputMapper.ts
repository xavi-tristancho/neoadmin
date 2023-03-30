import { ModelUpsertState } from "@neoco/neoco-backoffice/src/types";
import { Field } from "../types";

export type HandleChange = (nextState: { [key: string]: unknown }) => void;
export type CustomEvent = { target: { name: string; value: unknown } };

export const defaultFormat = ({
  state,
  field,
}: {
  state: ModelUpsertState;
  field: Field;
}): unknown => state.data[field.name] || state.data[field.property];

export const getFromat = ({ field }: { field: Field }): unknown =>
  field.upsertOptions?.format || defaultFormat;

export const defaultHandleChange =
  (handleChange: HandleChange) =>
  ({ target: { name, value } }: CustomEvent) => {
    handleChange({ [name]: value });
  };

export const getHandleChange = ({
  field,
  handleChange,
}: {
  field: Field;
  handleChange: HandleChange;
}): (({ target: { name, value } }: CustomEvent) => Promise<void> | void) => {
  if (field.upsertOptions?.onChange) {
    return async ({ target: { name, value } }: CustomEvent): Promise<void> => {
      const nextState = await field.upsertOptions?.onChange({ name, value });
      handleChange(nextState);
    };
  } else {
    return defaultHandleChange(handleChange);
  }
};

export const getDisabled = ({
  field,
  state,
}: {
  state: ModelUpsertState;
  field: Field;
}): boolean => {
  const { disabled = false } = field;

  return typeof disabled === "function" ? disabled({ field, state }) : disabled;
};

export const zeroNeededFormat = (value = "0") => {
  const parsedValue = parseInt(value);
  return (value || value === 0) && !Number.isNaN(parsedValue)
    ? parsedValue < 10
      ? `0${parsedValue}`
      : parsedValue
    : "--";
};
