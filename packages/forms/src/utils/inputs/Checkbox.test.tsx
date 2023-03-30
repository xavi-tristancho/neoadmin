import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormControlLabelProps } from "@mui/material";
import { UpsertOptions } from "@neoco/neoco-backoffice/src/types";
import CheckboxForm from "./Checkbox";

describe("regarding the Checkbox component", () => {
  describe("given upsertOptions.show equal true", () => {
    it("should render the component Checkbox", () => {
      const props = {
        checked: false,
        label: "",
        upsertOptions: { show: true },
      };
      render(getElement(props));

      const element = screen.queryByTestId("checkbox-test");
      expect(element).toBeInTheDocument();
    });
  });

  describe("given upsertOptions.show equal false", () => {
    it("should not render the component Checkbox", () => {
      const props = {
        checked: false,
        label: "",
        upsertOptions: { show: false },
      };
      render(getElement(props));

      const element = screen.queryByTestId("checkbox-test");
      expect(element).not.toBeInTheDocument();
    });
  });
});

const getElement = (
  props: FormControlLabelProps & {
    property?: string;
    required?: boolean;
    upsertOptions?: UpsertOptions;
  }
) => <CheckboxForm {...props} />;
