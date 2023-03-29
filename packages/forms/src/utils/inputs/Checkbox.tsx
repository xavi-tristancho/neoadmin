import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
} from "@mui/material";
import { UpsertOptions } from "@neoco/neoco-backoffice/src/types";

type CheckboxFormProps = FormControlLabelProps & {
  property?: string;
  required?: boolean;
  upsertOptions?: UpsertOptions;
};

const CheckboxForm = (args: CheckboxFormProps) => {
  const {
    property = "",
    name = property,
    label = name,
    required = false,
    upsertOptions = {},
    onChange = () => {
      return;
    },
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
