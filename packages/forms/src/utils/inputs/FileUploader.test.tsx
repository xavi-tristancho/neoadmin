import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { unknownObject } from "@neoco/neoco-backoffice/src/types";
import { Field } from "../../types";
import FileUploader, { State } from "./FileUploader";

describe("regarding the FileUploader component", () => {
  it("should render the FileUploader component", () => {
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

    const element = screen.queryByTestId("file-uploader-test");
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
