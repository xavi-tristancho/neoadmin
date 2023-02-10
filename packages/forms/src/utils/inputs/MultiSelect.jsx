import React from "react";
import { FormControl, TextField, Autocomplete } from "@mui/material";
import styled from "styled-components";

const MultiSelect = (props) => {
  const {
    property = "",
    name = property,
    label = name,
    upsertOptions = {},
    onChange = () => {},
    fullWidth = true,
    isMulti = false,
    options = [],
    placeholder = "-",
    value = [],
    renderInputProps = {},
    allowEmptyValue = true,
    ...field
  } = props;
  const { show = true } = upsertOptions;
  const selectOptions = [
    ...(!isMulti && allowEmptyValue ? [{ label: placeholder, value: "" }] : []),
    ...options,
  ];

  const handleChange = (newValue) => {
    const formattedValue = Array.isArray(newValue) ? newValue : [newValue];
    onChange({ target: { name, value: formattedValue } });
  };

  return show ? (
    <StyledFormControl fullWidth={fullWidth}>
      <Autocomplete
        id={property}
        multiple={isMulti}
        limitTags={2}
        autoHighlight={true}
        disableCloseOnSelect={isMulti}
        onChange={(event, newValue) => handleChange(newValue)}
        renderInput={(params) => (
          <TextField label={label} {...params} {...renderInputProps} />
        )}
        value={getSelectedValue({
          options: selectOptions,
          selected: value,
          isMulti,
        })}
        options={selectOptions}
        {...field}
      />
    </StyledFormControl>
  ) : (
    <></>
  );
};

const getSelectedValue = ({ options = [], selected = [], isMulti = false }) => {
  const result = options.filter((option) =>
    selected?.some((stateValue) => stateValue?.value === option?.value)
  );
  return (isMulti ? result : result[0]) || "";
};

const StyledFormControl = styled(FormControl)`
  && {
    margin-bottom: 20px;
  }
`;

export default MultiSelect;
