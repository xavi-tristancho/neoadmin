import React from "react";
import TextField from "@mui/material/TextField";
import {
  DatePicker,
  DateTimePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import styled from "styled-components";
import { DateTime } from "luxon";

const DatePickerInput = ({
  property = "",
  name = property,
  label = name,
  required = false,
  tableOptions = undefined,
  upsertOptions = {},
  onChange = () => {},
  fullWidth = true,
  pickerType = "date",
  value = null,
  renderInputProps = {},
  ...props
}) => {
  const { show = true } = upsertOptions;
  const pickerValue =
    typeof value === "string" && pickerType === "time"
      ? DateTime.fromFormat(value, "hh:mm")
      : value;

  let Picker;
  switch (pickerType) {
    case "time":
      Picker = TimePicker;
      break;

    case "dateAndTime":
      Picker = DateTimePicker;
      break;

    default:
      Picker = DatePicker;
      break;
  }

  return show ? (
    <Container>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Picker
          value={pickerValue}
          id={property}
          property={property}
          name={name}
          label={label}
          required={required}
          onChange={(data) => {
            const { year, month, day, hour, minute } = data || {};
            const formattedMonth = zeroNeededFormat(month);
            const formattedDay = zeroNeededFormat(day);
            const formattedHour = zeroNeededFormat(hour);
            const formattedMinute = zeroNeededFormat(minute);
            const formattedDate =
              year + "-" + formattedMonth + "-" + formattedDay;
            const formattedTime = formattedHour + ":" + formattedMinute;

            let formattedValue;
            switch (pickerType) {
              case "time":
                formattedValue = formattedTime;
                break;

              case "dateAndTime":
                formattedValue = `${formattedDate}T${formattedTime}`;
                break;

              default:
                formattedValue = formattedDate;
                break;
            }
            onChange({
              target: {
                name,
                value: formattedValue,
              },
            });
          }}
          renderInput={(params) => (
            <TextField
              fullWidth={fullWidth}
              {...params}
              {...renderInputProps}
            />
          )}
          {...props}
        />
      </LocalizationProvider>
    </Container>
  ) : (
    <></>
  );
};

const Container = styled.div`
  margin-bottom: 20px;
`;

const zeroNeededFormat = (value = 0) => {
  const parsedValue = parseInt(value);
  return (value || value === 0) && !Number.isNaN(parsedValue)
    ? parsedValue < 10
      ? `0${parsedValue}`
      : parsedValue
    : "--";
};

export default DatePickerInput;
