import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./Input";

describe("regarding the Input component", () => {
  it("should render the component", () => {
    render(
      getElement({
        onChange: () => {
          return;
        },
      })
    );

    const element = screen.queryByTestId("InputTest");
    expect(element).toBeInTheDocument();
  });
});

const getElement = (props: { onChange: (file: File) => void }) => (
  <Input onChange={props.onChange} />
);
