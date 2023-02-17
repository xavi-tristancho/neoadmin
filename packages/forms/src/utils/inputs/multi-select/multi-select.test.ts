import { describe, it, expect } from "vitest";
import { multiselect } from "./multi-select";
import { MultiSelectField } from "./types";

type Category = {
  id: number;
  name: string;
};

const defaultField: MultiSelectField<Category> = {
  type: "multiselect",
  property: "categories",
  relation: {
    isMulti: true,
    name: "categories",
    format: (category) => category.name,
  },
};

const firstOption = { id: 1, name: "Sports" };
const options = [firstOption, { id: 2, name: "Tech" }];

describe("regarding the multiselect utility functions", () => {
  const handleChange = () => null;

  describe("when the options are in the aux state", () => {
    const defaultState = {
      data: { categories: [firstOption] },
      aux: {
        categories: options,
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
            getOptionLabel: expect.any(Function),
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
          data: { ...defaultState.data, categories: firstOption },
        };

        it("should return the expected props structure", () => {
          expect(multiselect({ field, state, handleChange })).toEqual({
            isMulti: false,
            value: firstOption,
            options,
            onChange: expect.any(Function),
            getOptionLabel: expect.any(Function),
          });
        });
      });
    });

    describe("and there is not a selected option in the state", () => {
      const emptyState = {
        ...defaultState,
        data: { ...defaultState.data, categories: undefined },
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
            getOptionLabel: expect.any(Function),
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
            getOptionLabel: expect.any(Function),
          });
        });
      });
    });
  });

  describe("when the options are in the field", () => {
    const defaultState = {
      data: { categories: [firstOption] },
      aux: {},
    };

    const fieldWithOptions: MultiSelectField<Category> = {
      type: "multiselect",
      property: "categories",
      relation: {
        isMulti: true,
        options,
        format: (option) => option.name,
      },
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
            getOptionLabel: expect.any(Function),
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
          data: { ...defaultState.data, categories: firstOption },
        };

        it("should return the expected props structure", () => {
          expect(multiselect({ field, state, handleChange })).toEqual({
            isMulti: false,
            value: firstOption,
            options,
            onChange: expect.any(Function),
            getOptionLabel: expect.any(Function),
          });
        });
      });
    });

    describe("and there is not a selected option in the state", () => {
      const emptyState = {
        ...defaultState,
        data: { ...defaultState.data, categories: undefined },
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
            getOptionLabel: expect.any(Function),
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
            getOptionLabel: expect.any(Function),
          });
        });
      });
    });
  });
});
