import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import DeleteRowDialog from "./DeleteRowDialog";

describe("Regarding DeleteRowDialog component", () => {
  const deleteFn = vi.fn();
  const cancelFn = vi.fn();
  it("should render the component", () => {
    render(getElement());
    expect(screen.getByText("general.areYouSure")).toBeInTheDocument();
  });

  describe("when the cancel button is clicked", () => {
    it("should close the dialog", () => {
      const { container } = render(getElement());
      const cancelBtn = screen.getByText("actions.cancel");
      fireEvent.click(cancelBtn);
      expect(container.firstChild).not.toBeInTheDocument();
    });
  });

  describe("when the delete button is clicked", () => {
    it("should call onConfirmDeleteClick", () => {
      render(getElement());
      const deleteBtn = screen.getByText("actions.delete");
      fireEvent.click(deleteBtn);
      expect(deleteFn).toHaveBeenCalled();
    });
  });

  const getElement = () => (
    <DeleteRowDialog
      open={true}
      onConfirmDeleteClick={deleteFn}
      onCancelDeleteClick={cancelFn}
    />
  );
});
