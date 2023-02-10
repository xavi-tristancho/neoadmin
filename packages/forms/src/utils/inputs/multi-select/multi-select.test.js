import {
  getMultiSelectProps,
  getSingleSelectProps,
  getOptions,
} from "./multi-select";

describe("regarding the multiselect utility functions", () => {
  describe("regarding the getMultiSelectProps function", () => {
    describe("when the options are in the state", () => {
      it("should work", () => {
        const field = {
          type: "multiselect",
          property: "types",
          relation: { type: "hasMany", name: "types", nameProps: ["name"] },
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

        expect(getMultiSelectProps({ field, state })).toEqual({
          options: [
            { id: 1, label: "Mode A", name: "Mode A", value: 1 },
            { id: 2, label: "Mode B", name: "Mode B", value: 2 },
          ],
        });
      });
    });
  });

  describe("regarding the getOptions function", () => {
    describe("when receiving an array of objects containing value and label keys", () => {
      it("should return the options well formatted", () => {
        const state = {
          data: {},
          aux: {
            users: [
              { label: "JT", value: 1 },
              { label: "JT2", value: 2 },
            ],
          },
        };
        const name = "users";
        const nameProps = ["name"];
        const result = getOptions({ state, name, nameProps });

        expect(result).toEqual([
          { label: "JT", value: 1 },
          { label: "JT2", value: 2 },
        ]);
      });
    });
    describe("when receiving an array of strings", () => {
      it("should return the options well formatted", () => {
        const state = {
          data: {},
          aux: {
            users: ["JT", "JT2"],
          },
        };
        const name = "users";
        const nameProps = ["name"];
        const result = getOptions({ state, name, nameProps });

        expect(result).toEqual([
          { label: "JT", value: "JT" },
          { label: "JT2", value: "JT2" },
        ]);
      });
    });
  });

  describe("regarding the getSingleSelectProps function", () => {
    describe("when the options are defined by the user", () => {
      describe("with an empty state", () => {
        it("should work", () => {
          const field = {
            type: "multiselect",
            property: "type",
            relation: {
              isMulti: false,
              name: "type",
              nameProps: ["name"],
              options: [
                { value: "modeA", label: "Mode A" },
                { value: "modeB", label: "Mode B" },
              ],
            },
          };

          const state = {
            data: { type: "" },
          };

          const handleChange = () => {};

          expect(getSingleSelectProps({ field, state, handleChange })).toEqual({
            onChange: expect.any(Function),
            options: [
              { value: "modeA", label: "Mode A" },
              { value: "modeB", label: "Mode B" },
            ],
            value: "",
          });
        });
      });

      describe("with an existing state", () => {
        it("should work", () => {
          const field = {
            type: "multiselect",
            property: "type",
            relation: {
              isMulti: false,
              name: "type",
              nameProps: ["name"],
              options: [
                { value: "modeA", label: "Mode A" },
                { value: "modeB", label: "Mode B" },
              ],
            },
          };

          const state = {
            data: { type: "modeA" },
          };

          const handleChange = () => {};

          expect(getSingleSelectProps({ field, state, handleChange })).toEqual({
            onChange: expect.any(Function),
            options: [
              { value: "modeA", label: "Mode A" },
              { value: "modeB", label: "Mode B" },
            ],
            value: { value: "modeA", label: "Mode A" },
          });
        });
      });
    });
  });
});
