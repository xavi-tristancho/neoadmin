import {
  FormControl,
  TextField,
  Autocomplete,
  TextFieldProps,
  AutocompleteProps,
  styled,
} from "@mui/material";

type MultiSelectProps = {
  property: string;
  name: string;
  label: string;
  upsertOptions: {
    show: boolean;
  };
  fullWidth: boolean;
  placeholder: string;
  value: unknown;
  renderInputProps: TextFieldProps;
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
  renderInputProps = {},
  ...field
}: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  MultiSelectProps): JSX.Element => {
  const { show = true } = upsertOptions;

  return show ? (
    <StyledFormControl fullWidth={fullWidth}>
      <Autocomplete
        id={property}
        limitTags={2}
        autoHighlight={true}
        disableCloseOnSelect={!!field.multiple}
        renderInput={(params) => (
          <TextField label={label} {...params} {...renderInputProps} />
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
