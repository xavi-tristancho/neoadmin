import { FormControlLabelProps } from "@mui/material";
import TextField from "@mui/material/TextField";
import { UpsertOptions } from "@app-artisans/backoffice/src/types";
import styled from "styled-components";

type InputProps = FormControlLabelProps & {
  property?: string;
  type?: string;
  required?: boolean;
  upsertOptions?: UpsertOptions;
  fullWidth?: boolean;
};

const Input = ({
  property = "",
  type = "",
  name = property,
  label = name,
  required = false,
  upsertOptions = {},
  onChange = () => {
    return;
  },
  fullWidth = true,
  ...props
}: InputProps) => {
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
