import { Field } from "@neoco/neoco-form/src/types";
import { describe, it, expect } from "vitest";
import {
  removeIfNotVisible,
  someRequiredValuesAreEmpty,
  sameElement,
  showRender,
} from "./common";

describe("regarding the removeIfNotVisible function", () => {
  describe("given 'show' is not a function", () => {
    describe("given a 'show: false' value", () => {
      it("should return false", () => {
        const itemAndPageType = {
          item: [
            {
              id: 1,
            },
          ],
          pageType: "upsertOptions",
        };
        expect(
          removeIfNotVisible(itemAndPageType)({
            upsertOptions: { show: false },
          })
        ).toEqual(false);
      });
    });
  });

  describe("given a function to the 'show' parameter", () => {
    const item = [{ id: 1 }];
    describe("given a 'show: false' value through the result of a function", () => {
      it("should receive the current item and return false", () => {
        expect(
          removeIfNotVisible({ item, pageType: "upsertOptions" })({
            upsertOptions: {
              show: (receivedItem) => {
                expect(receivedItem).toEqual(item);
                return false;
              },
            },
          })
        ).toEqual(false);
      });
    });

    describe("given a 'show: true' value through the result of a function", () => {
      it("should receive the current item and return true", () => {
        expect(
          removeIfNotVisible({ item, pageType: "upsertOptions" })({
            upsertOptions: {
              show: (receivedItem) => {
                expect(receivedItem).toEqual(item);
                return true;
              },
            },
          })
        ).toEqual(true);
      });
    });
  });
});

describe("regarding the someRequiredValuesAreEmpty function", () => {
  it(`should return true if the given arguments are anything else than this object structure:
      {
        fields: [{name, required}],
        values: {[name]: value}
      }
      `, () => {
    expect(someRequiredValuesAreEmpty(null)).toEqual(true);
    expect(someRequiredValuesAreEmpty(undefined)).toEqual(true);
  });

  it("should return true if at least one required value has no value or has an empty string", () => {
    const fields: Field[] = [{ name: "email", type: "text", required: true }];
    const fields2: Field[] = [
      { name: "email", type: "text", required: true },
      { name: "password", type: "password", required: true },
    ];
    const values = {
      token: "1234567890",
      user: {
        name: "John Doe",
        email: "",
      },
    };
    expect(someRequiredValuesAreEmpty({ fields, values })).toEqual(true);
    expect(someRequiredValuesAreEmpty({ fields: fields2, values })).toEqual(
      true
    );
  });

  it("should return false if every required field has a value different than an empty string", () => {
    const fields: Field[] = [{ name: "email", type: "text", required: true }];
    const values = {
      token: "1234567890",
      user: {
        name: "John Doe",
        email: "foo@bom",
      },
    };
    expect(someRequiredValuesAreEmpty({ fields, values })).toEqual(false);
  });
});

describe("regarding the sameElement function", () => {
  describe("if falsy values are given as arguments", () => {
    it("should return true if they are the same", () => {
      expect(sameElement(null, null)).toEqual(true);
    });

    it("should return false if they are not the same", () => {
      expect(sameElement(null, undefined)).toEqual(false);
    });

    it("should return false if they are not the same", () => {
      expect(sameElement(0, -1)).toEqual(false);
    });

    it("should return true if they are the same", () => {
      expect(sameElement(undefined, undefined)).toEqual(true);
    });
  });

  describe("if two different values of the same type are given as arguments", () => {
    it("should return false", () => {
      expect(sameElement("aaa", "bbb")).toEqual(false);
    });

    it("should return false", () => {
      expect(sameElement({ val: "aaa" }, { val: "bbb" })).toEqual(false);
    });

    it("should return false", () => {
      expect(sameElement(["aaa"], ["bbb"])).toEqual(false);
    });
  });

  describe("if two equal values of a different type are given as arguments", () => {
    it("should return false", () => {
      expect(sameElement("aaa", { val: "aaa" })).toEqual(false);
    });

    it("should return false", () => {
      expect(sameElement("aaa", ["aaa"])).toEqual(false);
    });
  });

  describe("if two equal values of the same type are given as arguments", () => {
    it("should return true", () => {
      expect(sameElement("aaa", "aaa")).toEqual(true);
    });

    it("should return true", () => {
      expect(sameElement(1234, 1234)).toEqual(true);
    });

    it("should return true", () => {
      expect(sameElement({ val: "aaa" }, { val: "aaa" })).toEqual(true);
    });

    it("should return true", () => {
      expect(sameElement(["aaa"], ["aaa"])).toEqual(true);
    });
  });
});

describe("regarding the showRender function", () => {
  describe("when passing a string as the element to render", () => {
    describe("given state to send", () => {
      it("should return only the string", () => {
        const stringToRender = "str-to-render";
        const state = { data: "b" };
        expect(showRender(stringToRender, state)).toEqual(stringToRender);
      });
    });
  });

  describe("when passing an object as the element to render", () => {
    describe("given state to send", () => {
      it("should return only the object", () => {
        const objectToRender = { key: "object-to-render" };
        const state = { a: "b" };
        expect(showRender(objectToRender, state)).toEqual(objectToRender.key);
      });
    });
  });

  describe("when passing null as the element to render", () => {
    describe("given state to send", () => {
      it("should return only the object", () => {
        const elementToRender: string = null;
        const state = { a: "b" };
        expect(showRender(elementToRender, state)).toEqual(elementToRender);
      });
    });
  });

  describe("when passing a function as the element to render", () => {
    describe("given state to send", () => {
      it("should return the value of the function using the state", () => {
        const state = { a: "stateProp" };
        const functionToRender = (props: { state: { a: string } }) =>
          `function-passed${props.state.a}`;
        const renderExpected = functionToRender({ state });
        const renderResult = showRender(functionToRender, state);
        expect(renderResult).toEqual(renderExpected);
      });
    });
  });
});
