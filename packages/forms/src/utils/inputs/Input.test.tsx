import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UpsertOptions } from "@neoco/neoco-backoffice/src/types";
import { FormControlLabelProps } from "@mui/material";
import Input from "./Input";

describe("regarding the Input component", () => {
  describe("when 'upsertOptions.show' is true", () => {
    it("should render the Input component", () => {
      const props = {
        upsertOptions: { show: true },
      };
      render(getElement(props));

      const element = screen.queryByTestId("input-test");
      expect(element).toBeInTheDocument();
    });
  });

  describe("when 'upsertOptions.show' doesn't exist", () => {
    it("should render the Input component", () => {
      const props = {
        upsertOptions: {},
      };
      render(getElement(props));

      const element = screen.queryByTestId("input-test");
      expect(element).toBeInTheDocument();
    });
  });

  describe("when 'upsertOptions.show' is false", () => {
    it("should not render the Input component", () => {
      const props = {
        upsertOptions: { show: false },
      };
      render(getElement(props));

      const element = screen.queryByTestId("input-test");
      expect(element).not.toBeInTheDocument();
    });
  });
});

const getElement = (
  props: FormControlLabelProps & {
    property?: string;
    type?: string;
    required?: boolean;
    upsertOptions?: UpsertOptions;
    fullWidth?: boolean;
  }
) => <Input {...props} />;
