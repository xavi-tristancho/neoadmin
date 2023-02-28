import { DateTime } from "luxon";

export const date = ({
  field,
  state,
  handleChange,
  format,
  toFormat = "yyyy-MM-dd",
}) => {
  const value = format({ state, field });
  const parsedDate = DateTime.fromISO(value);

  return {
    ...field,
    onChange: handleChange,
    value: parsedDate.isValid ? parsedDate.toFormat(toFormat) : value,
  };
};

export default date;
