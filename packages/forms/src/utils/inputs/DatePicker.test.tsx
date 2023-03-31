import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  unknownObject,
  UpsertOptions,
} from "@neoco/neoco-backoffice/src/types";
import DatePickerInput from "./DatePicker";

describe("regarding the DatePicker component", () => {
  describe("given upsertOptions.show equal true", () => {
    it("should render the component DatePicker", () => {
      const props = {
        upsertOptions: { show: true },
      };
      render(getElement(props));

      const element = screen.queryByTestId("date-picker-test");
      expect(element).toBeInTheDocument();
    });
  });

  describe("given upsertOptions.show equal false", () => {
    it("should not render the component DatePicker", () => {
      const props = {
        upsertOptions: { show: false },
      };
      render(getElement(props));

      const element = screen.queryByTestId("date-picker-test");
      expect(element).not.toBeInTheDocument();
    });
  });
});

const getElement = (props: {
  [x: string]: unknownObject;
  property?: string;
  name?: string;
  label?: string;
  required?: boolean;
  upsertOptions?: UpsertOptions;
  onChange?: ({ target: { name: string, value: unknownObject } }) => void;
  fullWidth?: boolean;
  pickerType?: string;
  value?: string | null;
  renderInputProps?: unknownObject;
}) => <DatePickerInput {...props} />;
