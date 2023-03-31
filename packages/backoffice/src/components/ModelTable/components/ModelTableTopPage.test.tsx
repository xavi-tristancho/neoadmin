import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ModelTableTopPage from "./ModelTableTopPage";

describe("Regarding ModelTableTopPage component", () => {
  it("should render", () => {
    render(getElement(true));
    expect(screen.getByTestId("model-table-top-page")).toBeInTheDocument();
  });

  it("should show the 'Add' button if the `isCreatable` prop is true", () => {
    const { getByTestId } = render(getElement(true));
    expect(getByTestId("add-button")).toBeInTheDocument();
  });

  describe("when 'isCreatable' is false", () => {
    it("should not show the 'Add' button", () => {
      const { queryByTestId } = render(getElement(false));
      expect(queryByTestId("add-button")).not.toBeInTheDocument();
    });
  });

  const getElement = (isCreatable: boolean) => (
    <BrowserRouter>
      <ModelTableTopPage
        pageName="ModelTableTopPage"
        isCreatable={isCreatable}
        path="/"
      />
    </BrowserRouter>
  );
});
