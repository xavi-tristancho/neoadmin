import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import RenderActionsCell from "./RenderActionsCell";

describe("Regarding RenderActionsCell compnent", () => {
  it("should render", () => {
    render(getElement({}, true));
    expect(screen.getByTestId("render-actions-cell")).toBeInTheDocument();
  });

  const getElement = (item = {}, isDeletable: boolean) => (
    <BrowserRouter>
      <RenderActionsCell
        item={item}
        getItemActions={() => ({ isEditable: true, isDeletable: isDeletable })}
        onDeleteClick={vi.fn()}
        updateState={vi.fn()}
        renderActions={() => <div />}
        remoteData={{}}
        isEditable={true}
        isDeletable={isDeletable}
        path=""
      />
    </BrowserRouter>
  );
});
