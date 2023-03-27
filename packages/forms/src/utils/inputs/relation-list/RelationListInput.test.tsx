import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { Field } from "../../../types";
import RelationListInput, { RelationListInputProps } from "./RelationListInput";

describe("Regarding RelationListInput component", () => {
  const field: Field = {
    type: "relation-list",
    name: "age",
    property: "age",
    label: "test",
    relation: {
      name: "test",
      nameProps: ["name"],
      primaryKey: "id",
    },
  };
  const state = {
    data: {
      id: 1,
      name: "John",
      age: [{ id: 1, name: "Option 1", value: 27 }],
    },
    aux: {
      test: [
        { id: "1", name: "Option 1", value: 27 },
        { id: "2", name: "Option 2", value: 23, default: true },
      ],
    },
  };

  const getElement = (
    props: RelationListInputProps = {
      field,
      state,
      onChange: vi.fn(),
      config: {},
      label: field.label,
    }
  ) => (
    <RelationListInput
      field={props.field}
      state={props.state}
      onChange={props.onChange}
      config={props.config}
      label={props.label}
    />
  );

  it("should render", () => {
    render(getElement());
    const element = screen.getByTestId("relation-list-line-0");
    expect(element).toBeInTheDocument();
  });
  it("should render with custom delete icon", () => {
    const DeleteIcon = () => <div>Custom Delete Icon</div>;
    render(
      getElement({
        field: { ...field, CustomDeleteIcon: DeleteIcon },
        state,
        onChange: vi.fn(),
        config: {},
        label: field.label,
      })
    );
    const element = screen.getByTestId("relation-list-line-0");
    expect(element).toBeInTheDocument();
  });
  it("should render a RelationListLine for each item", () => {
    render(
      getElement({
        field,
        state,
        onChange: vi.fn(),
        config: {},
        label: field.label,
      })
    );
    const elements = screen.getAllByTestId("relation-list-line-0");
    expect(elements.length).toBe(state.data.age.length);
  });

  it("should render without crashing if items array is empty", () => {
    const newState = {
      data: {
        id: 1,
        name: "John",
        age: [],
      },
      aux: {
        test: [
          { id: "1", name: "Option 1", value: 27 },
          { id: "2", name: "Option 2", value: 23, default: true },
        ],
      },
    };
    const { getByText } = render(
      getElement({
        field,
        state: newState,
        onChange: vi.fn(),
        config: {},
        label: field.label,
      })
    );
    expect(getByText("test")).toBeInTheDocument();
  });
});
