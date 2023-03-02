import { DateTime } from "luxon";
import { DefaultField } from "@neoco/neoco-form/src/types";
import { unknownObject } from "@neoco/neoco-backoffice/src/types";

type DateInput = {
  field: DefaultField;
  state: unknownObject;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  format: ({
    state,
    field,
  }: {
    state: unknownObject;
    field: DefaultField;
  }) => string;
  toFormat?: string;
};

type DateOutput = DefaultField & {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string;
};

const date = ({
  field,
  state,
  handleChange,
  format,
  toFormat = "yyyy-MM-dd",
}: DateInput): DateOutput => {
  const formatValue: string = format({ state, field });
  const parsedDate = DateTime.fromISO(formatValue);
  const value: string = parsedDate.isValid
    ? parsedDate.toFormat(toFormat)
    : formatValue;

  return {
    ...field,
    onChange: handleChange,
    value,
  };
};

export default date;
