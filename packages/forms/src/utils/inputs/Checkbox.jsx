import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const CheckboxForm = (args) => {
  const {
    property = "",
    type = "",
    name = property,
    label = name,
    required = false,
    tableOptions = undefined,
    upsertOptions = {},
    onChange = () => {},
    checked = false,
    ...props
  } = args;

  const { show = true } = upsertOptions;

  return show ? (
    <FormControlLabel
      control={<Checkbox checked={checked} required={required} {...props} />}
      label={label}
      onChange={onChange}
    />
  ) : (
    <></>
  );
};

export default CheckboxForm;
