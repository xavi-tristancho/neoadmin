import {
  FormControl,
  TextField,
  Autocomplete,
  TextFieldProps,
  AutocompleteProps,
} from "@mui/material";
import styled from "styled-components";

type MultiSelectProps = {
  property: string;
  name: string;
  label: string;
  upsertOptions: {
    show: boolean;
  };
  fullWidth: boolean;
  isMulti: boolean;
  placeholder: string;
  value: unknown;
  renderInputProps?: TextFieldProps;
};

const MultiSelect = <
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
>({
  property = "",
  name = property,
  label = name,
  upsertOptions = { show: true },
  fullWidth = true,
  isMulti = false,
  renderInputProps = {},
  ...field
}: Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  "renderInput"
> &
  MultiSelectProps): JSX.Element => {
  const { show = true } = upsertOptions;

  return show ? (
    <StyledFormControl fullWidth={fullWidth}>
      <Autocomplete
        id={property}
        multiple={isMulti}
        limitTags={2}
        autoHighlight={true}
        disableCloseOnSelect={isMulti}
        renderInput={(params) => (
          <TextField
            label={label}
            {...params}
            {...renderInputProps}
            data-testid={property}
          />
        )}
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
