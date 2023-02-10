import {
  removeIfNotVisible,
  someRequiredValuesAreEmpty,
  sameElement,
  showRender,
} from "./common";

describe("regarding the removeIfNotVisible function", () => {
  it("should return true by default", () => {
    expect(removeIfNotVisible()()).toEqual(true);
  });

  describe("given 'show' not as a function", () => {
    describe("given a 'show: hola' value", () => {
      it("should return the given value of show", () => {
        const itemAndPageType = { id: 1, pageType: "upsertOptions" };
        const field = {
          upsertOptions: { show: "hola" },
        };
        expect(removeIfNotVisible(itemAndPageType)(field)).toBe("hola");
      });
    });

    describe("given a 'show: false' value", () => {
      it("should return false", () => {
        expect(
          removeIfNotVisible({ pageType: "upsertOptions" })({
            upsertOptions: { show: false },
          })
        ).toEqual(false);
      });
    });
  });

  describe("given a function to the 'show' parameter", () => {
    describe("given a 'show: false' value through the result of a function", () => {
      it("should receive the current item and return false", () => {
        const item = { id: 1 };
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
        const item = { id: 1 };
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

    describe("given a 'show: 12' value through the result of a function", () => {
      it("should receive the current item and return 12", () => {
        const item = { id: 1 };
        expect(
          removeIfNotVisible({ item, pageType: "upsertOptions" })({
            upsertOptions: {
              show: (receivedItem) => {
                expect(receivedItem).toEqual(item);
                return 12;
              },
            },
          })
        ).toEqual(12);
      });
    });

    describe("given an empty object as upsertOptions", () => {
      it("should return true", () => {
        expect(
          removeIfNotVisible({ pageType: "upsertOptions" })({
            upsertOptions: {},
          })
        ).toEqual(true);
      });
    });
  });
});

describe("regarding the someRequiredValuesAreEmpty function", () => {
  it("should return true if no values are given as arguments", () => {
    expect(someRequiredValuesAreEmpty()).toEqual(true);
  });

  it(`should return true if the given arguments are anything else than this object structure: 
      { 
        fields: [{name, required}],
        values: {[name]: value}
      }
      `, () => {
    const fields = [];
    const values = {};
    expect(someRequiredValuesAreEmpty("")).toEqual(true);
    expect(someRequiredValuesAreEmpty(null)).toEqual(true);
    expect(someRequiredValuesAreEmpty(undefined)).toEqual(true);
    expect(someRequiredValuesAreEmpty([])).toEqual(true);
    expect(someRequiredValuesAreEmpty({})).toEqual(true);
    expect(someRequiredValuesAreEmpty({ fields, values })).toEqual(true);
  });

  it("should return true if at least one required value has no value or has an empty string", () => {
    const fields = [{ name: "email", required: true }];
    const fields2 = [{ name: "email", required: true }, { name: "password" }];
    const values = {};
    const values2 = { email: "" };
    expect(someRequiredValuesAreEmpty({ fields, values })).toEqual(true);
    expect(someRequiredValuesAreEmpty({ fields, values: values2 })).toEqual(
      true
    );
    expect(
      someRequiredValuesAreEmpty({ fields: fields2, values: values2 })
    ).toEqual(true);
  });

  it("should return false if every required field has a value different than an empty string", () => {
    const fields = [{ name: "email", required: true }, { name: "password" }];
    const values = { email: "foo@bar.com" };
    expect(someRequiredValuesAreEmpty({ fields, values })).toEqual(false);
  });
});

describe("regarding the sameElement function", () => {
  describe("if no values are given as arguments", () => {
    it("should return true", () => {
      expect(sameElement()).toEqual(true);
    });
  });

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

  describe("if only one value is given as argument", () => {
    it("should return false", () => {
      expect(sameElement("aaa")).toEqual(false);
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
    describe("given no state to send", () => {
      it("should return the string", () => {
        const stringToRender = "str-to-render";
        expect(showRender(stringToRender)).toEqual(stringToRender);
      });
    });

    describe("given state to send", () => {
      it("should return only the string", () => {
        const stringToRender = "str-to-render";
        const state = { a: "b" };
        expect(showRender(stringToRender, state)).toEqual(stringToRender);
      });
    });
  });

  describe("when passing an object as the element to render", () => {
    describe("given no state to send", () => {
      it("should return the object", () => {
        const objectToRender = { key: "object-to-render" };
        expect(showRender(objectToRender).key).toEqual(objectToRender.key);
      });
    });

    describe("given state to send", () => {
      it("should return only the object", () => {
        const objectToRender = { key: "object-to-render" };
        const state = { a: "b" };
        expect(showRender(objectToRender, state).key).toEqual(
          objectToRender.key
        );
      });
    });
  });

  describe("when passing null as the element to render", () => {
    describe("given no state to send", () => {
      it("should return null", () => {
        const elementToRender = null;
        expect(showRender(elementToRender)).toEqual(elementToRender);
      });
    });

    describe("given state to send", () => {
      it("should return only the object", () => {
        const elementToRender = null;
        const state = { a: "b" };
        expect(showRender(elementToRender, state)).toEqual(elementToRender);
      });
    });
  });

  describe("when passing a function as the element to render", () => {
    describe("given no state to send", () => {
      it("should return the value of the function without using the state", () => {
        const functionToRender = (props = {}) => `function-passed${props}`;
        const renderExpected = functionToRender();
        const renderResult = showRender(functionToRender);
        expect(renderResult).toEqual(renderExpected);
      });
    });

    describe("given state to send", () => {
      it("should return the value of the function using the state", () => {
        const state = { a: "stateProp" };
        const functionToRender = (props) => `function-passed${props.state.a}`;
        const renderExpected = functionToRender({ state });
        const renderResult = showRender(functionToRender, state);
        expect(renderResult).toEqual(renderExpected);
      });
    });
  });
});
