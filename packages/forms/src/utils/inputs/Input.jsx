import React from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

const Input = ({
  property = "",
  type = "",
  name = property,
  label = name,
  required = false,
  tableOptions = undefined,
  upsertOptions = {},
  onChange = () => {},
  fullWidth = true,
  ...props
}) => {
  const inputType = property === "password" ? "password" : type;
  const { show = true } = upsertOptions;

  return show ? (
    <StyledInput
      id={property}
      property={property}
      type={inputType}
      name={name}
      label={label}
      required={required}
      onChange={onChange}
      fullWidth={fullWidth}
      {...props}
    />
  ) : (
    <></>
  );
};

const StyledInput = styled(TextField)`
  && {
    margin-bottom: 20px;
  }
`;

export default Input;
