import { describe, it, expect } from "vitest";
import { multiselect, getOptions, getSingleSelectProps } from "./multi-select";

describe("regarding the multiselect utility functions", () => {
  describe("when the options are in the aux state", () => {
    describe("and there is a selected option in the state", () => {
      describe("and the isMulti is true", () => {
        it("should return the expected options structure", () => {
          const field = {
            type: "multiselect",
            property: "types",
            relation: { isMulti: true, name: "types", nameProps: ["name"] },
          };

          const state = {
            data: { types: [{ id: 1, name: "Mode A" }] },
            aux: {
              types: [
                { id: 1, name: "Mode A" },
                { id: 2, name: "Mode B" },
              ],
            },
          };

          expect(multiselect({ field, state })).toEqual({
            isMulti: true,
            defaultValue: [{ id: 1, name: "Mode A" }],
            options: [
              { id: 1, name: "Mode A" },
              { id: 2, name: "Mode B" },
            ],
          });
        });
      });

      describe("and the isMulti is false", () => {
        const field = {
          type: "multiselect",
          property: "types",
          relation: { isMulti: false, name: "types", nameProps: ["name"] },
        };

        const state = {
          data: { types: { id: 1, name: "Mode A" } },
          aux: {
            types: [
              { id: 1, name: "Mode A" },
              { id: 2, name: "Mode B" },
            ],
          },
        };

        const firstValue = { id: 1, name: "Mode A" };

        it("should return the expected options structure", () => {
          expect(multiselect({ field, state })).toEqual({
            isMulti: false,
            defaultValue: firstValue,
            options: [firstValue, { id: 2, name: "Mode B" }],
          });
        });
      });
    });
  });
});
