import { TimePicker, DateTimePicker, DatePicker } from "@mui/x-date-pickers";

export type DatePickerField =
  | ({
      type: "time";
    } & React.ComponentProps<typeof TimePicker>)
  | ({
      type: "datetime-local";
    } & React.ComponentProps<typeof DateTimePicker>)
  | ({
      type: "date";
    } & React.ComponentProps<typeof DatePicker>);
