import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Section, unknownObject } from "@neoco/neoco-backoffice/src/types";
import { ButtonProps } from "@mui/material";
import FormGenerator from "./FormGenerator";

describe("regarding the FormGenerator component", () => {
  it("should render the component FormGenerator", () => {
    const props = {
      sections: [{}],
      state: {},
      handleChange: () => {
        return;
      },
    };
    render(getElement(props));

    const element = screen.queryByTestId("form-generator-test");
    expect(element).toBeInTheDocument();
  });

  describe("regarding the Section component", () => {
    it("should render the component Section", () => {
      const props = {
        sections: [{}],
        state: {},
        handleChange: () => {
          return;
        },
      };
      render(getElement(props));

      const element = screen.queryByTestId("form-generator-section-test");
      expect(element).toBeInTheDocument();
    });
  });
});

const getElement = (props: {
  sections: Section[];
  state: unknownObject;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | unknown
  ) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  children?:
    | ((props: { state: unknownObject }) => JSX.Element)
    | React.ReactNode;
  Button?: React.ComponentType<ButtonProps>;
  submitText?: string;
  submitButtonProps?: unknownObject;
  Title?: React.ComponentType<{ children: string }>;
}) => <FormGenerator {...props} />;
