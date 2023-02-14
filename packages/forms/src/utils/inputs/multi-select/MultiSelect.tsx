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
    placeholder = "-",
    value = [],
    renderInputProps = {},
    allowEmptyValue = true,
    ...field
  } = props;

  const { show = true } = upsertOptions;

  const handleChange = (value) => {
    onChange({ target: { name, value } });
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
        defaultValue={value}
        {...field}
      />
    </StyledFormControl>
  ) : (
    <></>
  );
};

const StyledFormControl = styled(FormControl)`
  && {
    margin-bottom: 20px;
  }
`;

export default MultiSelect;
