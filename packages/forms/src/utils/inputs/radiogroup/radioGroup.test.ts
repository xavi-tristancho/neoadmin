import { describe, it, expect } from "vitest";
import { getOptions, getSelectedOptions } from "./radioGroup";

describe("regarding getSelectedOptions function", () => {
  describe("given a state with a name defined", () => {
    describe("and relation has a name property", () => {
      it("should return the value from state.data[relation.name]", () => {
        const relation = {
          name: "name",
          nameProps: [],
          primaryKey: "id",
        };
        const property = "testProperty";
        const state = {
          data: { id: 1, name: "John", age: 25 },
        };
        expect(getSelectedOptions({ state, relation, property })).toEqual(
          "John"
        );
      });
    });
  });

  describe("and relation has no name property", () => {
    it("should return the value from state.data[property]", () => {
      const relation = {
        name: "name",
        nameProps: [],
        primaryKey: "id",
      };
      const property = "age";
      const state = {
        data: { id: 1, age: 25 },
      };
      expect(getSelectedOptions({ state, relation, property })).toEqual(25);
    });
  });

  describe("when there is no relation.name and property value does not match any state.data key", () => {
    it("should return undefined", () => {
      const relation = {
        name: "name",
        nameProps: [],
        primaryKey: "id",
      };
      const property = "address";
      const state = {
        data: { id: 1, age: 25 },
      };
      expect(getSelectedOptions({ state, relation, property })).toEqual(
        undefined
      );
    });
  });
});

describe("regarding getOptions function", () => {
  describe("when aux data exists", () => {
    it("should return options with mapped value and label fields ", () => {
      const name = "test";
      const nameProps = ["name"];
      const primaryKey = "id";
      const state = {
        aux: {
          name: [
            { id: "1", name: "Option 1" },
            { id: "2", name: "Option 2" },
          ],
        },
      };
      expect(getOptions({ state, name, nameProps, primaryKey })).toEqual([
        { value: "1", label: "Option 1", id: "1", name: "Option 1" },
        { value: "2", label: "Option 2", id: "2", name: "Option 2" },
      ]);
    });
  });

  //   it("should return an empty array when no aux data exists", () => {
  //     const name = "test";
  //     const nameProps = ["name"];
  //     const primaryKey = "id";
  //     const state = {};
  //     expect(getOptions({ state, name, nameProps, primaryKey })).toEqual([]);
  //   });

  //   it("should return options from field object when present", () => {
  //     const field = { options: [{ value: "1", label: "Option 1" }] };
  //     const state = {};
  //     expect(getOptions({ state, ...field })).toEqual([
  //       { value: "1", label: "Option 1" },
  //     ]);
  //   });
});

// describe("getName", () => {
//   it("should return a string with names joined by a space", () => {
//     const item = { firstName: "John", lastName: "Doe" };
//     const nameProps = ["firstName", "lastName"];
//     expect(getName({ item, nameProps })).toEqual("John Doe");
//   });

//   it("should return an empty string when no nameProps are provided", () => {
//     const item = { firstName: "John", lastName: "Doe" };
//     expect(getName({ item })).toEqual("");
//   });
// });

// describe("radiogroup", () => {
//   it("should throw an error when no relation or options prop is defined", () => {
//     const field = { property: "test" };
//     const state = {};
//     const handleChange = () => {};
//     expect(() => radiogroup({ field, state, handleChange })).toThrow();
//   });

//   it("should return an object with value, defaultValue, options, and onChange fields", () => {
//     const field = { relation: { name: "test", primaryKey: "id" } };
//     const state = { data: { [field.relation?.name]: "1" } };
//     const handleChange = () => {};
//     const radiogroupOutput = radiogroup({ field, state, handleChange });
//     expect(Object.keys(radiogroupOutput)).toEqual([
//       "value",
//       "defaultValue",
//       "options",
//       "onChange",
//     ]);
//   });

//   it("should set the selected option as the value", () => {
//     const field = { relation: { name: "test", primaryKey: "id" } };
//     const state = { data: { [field.relation?.name]: "1" } };
//     const handleChange = () => {};
//     const radiogroupOutput = radiogroup({ field, state, handleChange });
//     expect(radiogroupOutput.value).toEqual("1");
//   });

//   it("should set the default option as the defaultValue", () => {
//     const field = {
//       relation: { name: "test", primaryKey: "id" },
//       options: [{ value: "1", default: true }],
//     };
//     const state = { data: {} };
//     const handleChange = () => {};
//     const radiogroupOutput = radiogroup({ field, state, handleChange });
//     expect(radiogroupOutput.defaultValue).toEqual("1");
//   });

//   it("should call handleChange with the correct field name and value", () => {
//     const field = { name: "test" };
//     const state = {};
//     const handleChange = jest.fn();
//     const event = { target: { value: "test value" } };
//     const radiogroupOutput = radiogroup({ field, state, handleChange });
//     radiogroupOutput.onChange(event);
//     expect(handleChange).toHaveBeenCalledWith({
//       target: { name: field.name || field.property, value: event.target.value },
//     });
//   });
// });
