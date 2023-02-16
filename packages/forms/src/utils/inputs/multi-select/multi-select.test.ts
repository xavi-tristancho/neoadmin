import { describe, it, expect } from "vitest";
import { multiselect } from "./multi-select";

const defaultField = {
  type: "multiselect",
  property: "types",
  relation: { isMulti: true, name: "types", nameProps: ["name"] },
};

const firstOption = { id: 1, name: "Mode A" };
const options = [firstOption, { id: 2, name: "Mode B" }];

describe("regarding the multiselect utility functions", () => {
  const handleChange = () => null;

  describe("when the options are in the aux state", () => {
    const defaultState = {
      data: { types: [firstOption] },
      aux: {
        types: options,
      },
    };

    describe("and there is a selected option in the state", () => {
      describe("and the isMulti is true", () => {
        it("should return the expected props structure", () => {
          expect(
            multiselect({
              field: defaultField,
              state: defaultState,
              handleChange,
            })
          ).toEqual({
            isMulti: true,
            value: [firstOption],
            options,
            onChange: expect.any(Function),
          });
        });
      });

      describe("and the isMulti is false", () => {
        const field = {
          ...defaultField,
          relation: { ...defaultField.relation, isMulti: false },
        };
        const state = {
          ...defaultState,
          data: { ...defaultState.data, types: firstOption },
        };

        it("should return the expected props structure", () => {
          expect(multiselect({ field, state, handleChange })).toEqual({
            isMulti: false,
            value: firstOption,
            options,
            onChange: expect.any(Function),
          });
        });
      });
    });

    describe("and there is not a selected option in the state", () => {
      const emptyState = {
        ...defaultState,
        data: { ...defaultState.data, types: undefined },
      };

      describe("and the isMulti is true", () => {
        it("should return the expected props structure", () => {
          expect(
            multiselect({
              field: defaultField,
              state: emptyState,
              handleChange,
            })
          ).toEqual({
            isMulti: true,
            value: "",
            options,
            onChange: expect.any(Function),
          });
        });
      });

      describe("and the isMulti is false", () => {
        const field = {
          ...defaultField,
          relation: { ...defaultField.relation, isMulti: false },
        };

        it("should return the expected props structure", () => {
          expect(
            multiselect({ field, state: emptyState, handleChange })
          ).toEqual({
            isMulti: false,
            value: "",
            options,
            onChange: expect.any(Function),
          });
        });
      });
    });
  });

  describe("when the options are in the field", () => {
    const defaultState = {
      data: { types: [firstOption] },
      aux: {},
    };

    const fieldWithOptions = {
      type: "multiselect",
      property: "types",
      relation: { isMulti: true, name: "types", nameProps: ["name"], options },
    };

    describe("and there is a selected option in the state", () => {
      describe("and the isMulti is true", () => {
        it("should return the expected props structure", () => {
          expect(
            multiselect({
              field: fieldWithOptions,
              state: defaultState,
              handleChange,
            })
          ).toEqual({
            isMulti: true,
            value: [firstOption],
            options,
            onChange: expect.any(Function),
          });
        });
      });

      describe("and the isMulti is false", () => {
        const field = {
          ...fieldWithOptions,
          relation: { ...fieldWithOptions.relation, isMulti: false },
        };
        const state = {
          ...defaultState,
          data: { ...defaultState.data, types: firstOption },
        };

        it("should return the expected props structure", () => {
          expect(multiselect({ field, state, handleChange })).toEqual({
            isMulti: false,
            value: firstOption,
            options,
            onChange: expect.any(Function),
          });
        });
      });
    });

    describe("and there is not a selected option in the state", () => {
      const emptyState = {
        ...defaultState,
        data: { ...defaultState.data, types: undefined },
      };

      describe("and the isMulti is true", () => {
        it("should return the expected props structure", () => {
          expect(
            multiselect({
              field: fieldWithOptions,
              state: emptyState,
              handleChange,
            })
          ).toEqual({
            isMulti: true,
            value: "",
            options,
            onChange: expect.any(Function),
          });
        });
      });

      describe("and the isMulti is false", () => {
        const field = {
          ...fieldWithOptions,
          relation: { ...fieldWithOptions.relation, isMulti: false },
        };

        it("should return the expected props structure", () => {
          expect(
            multiselect({ field, state: emptyState, handleChange })
          ).toEqual({
            isMulti: false,
            value: "",
            options,
            onChange: expect.any(Function),
          });
        });
      });
    });
  });
});
