import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { unknownObject } from "@neoco/neoco-backoffice/src/types";
import { Field } from "../../types";
import FileUploader, { State } from "./FileUploader";

describe("regarding the FileUploader component", () => {
  it("should render the FileInput component", () => {
    const props = {
      field: {},
      state: {},
      format: () => {
        return;
      },
      fieldHandleChange: () => {
        return;
      },
    };
    render(getElement(props));

    const element = screen.queryByTestId("file-input-test");
    expect(element).toBeInTheDocument();
  });

  it("should render the FileUploaderContainer component", () => {
    const props = {
      field: {},
      state: {},
      format: () => {
        return;
      },
      fieldHandleChange: () => {
        return;
      },
    };
    render(getElement(props));

    const element = screen.queryByTestId("file-uploader-second-element-test");
    expect(element).toBeInTheDocument();
  });
});

const getElement = (props: {
  field: Field;
  state: State;
  format: ({ state, field }: { state: State; field: Field }) => unknown;
  fieldHandleChange: ({
    target,
  }: {
    target: {
      name: string;
      value: unknownObject;
    };
  }) => void;
}) => <FileUploader {...props} />;
