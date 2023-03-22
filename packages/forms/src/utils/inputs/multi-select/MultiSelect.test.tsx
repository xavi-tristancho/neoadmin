import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MultiSelect from "./MultiSelect";

describe("regarding the MultiSelect component", () => {
  describe("given the show prop", () => {
    describe("when it is true", () => {
      it("should render the component", () => {
        render(getElement({ show: true }));

        const element = screen.getByTestId("test");
        expect(element).toBeInTheDocument();
      });
    });

    describe("when it is false", () => {
      it("should not render the component", () => {
        render(getElement({ show: false }));
        const element = screen.queryByTestId("test");
        expect(element).not.toBeInTheDocument();
      });
    });
  });

  const getElement = (props: { show: boolean }) => (
    <MultiSelect<{ id: string; name: string }>
      property="test"
      name="test"
      label="test"
      upsertOptions={{ show: props.show }}
      fullWidth={true}
      isMulti={false}
      placeholder="-"
      value={null}
      options={[
        { id: "1", name: "test1" },
        { id: "2", name: "test2" },
        { id: "3", name: "test3" },
      ]}
    />
  );
});
