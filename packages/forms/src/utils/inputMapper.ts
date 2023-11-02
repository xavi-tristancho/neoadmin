import { ModelUpsertState } from "@app-artisans/backoffice/src/types";
import { Field } from "../types";

type HandleChange = (nextState: { [key: string]: unknown }) => void;
type CustomEvent = { target: { name: string; value: unknown } };

const defaultFormat = ({
  state,
  field,
}: {
  state: ModelUpsertState;
  field: Field;
}): unknown => state.data[field.name || field.property];

export const getFromat = ({ field }: { field: Field }): unknown =>
  field.upsertOptions?.format || defaultFormat;

const defaultHandleChange =
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
