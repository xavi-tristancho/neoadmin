import { describe, it, expect } from "vitest";
import { getHeaderDividers } from "./tableParser";

describe("regarding the getHeaderDividers function", () => {
  describe("given an array of headers", () => {
    describe("that are strings", () => {
      it("should the corresponding align symbol", () => {
        expect(getHeaderDividers(["Name", "Required"])).toStrictEqual([
          ":-",
          ":-:",
        ]);
      });
    });

    describe("that are empty strings", () => {
      it("should return the align center symbol", () => {
        expect(getHeaderDividers(["", ""])).toStrictEqual([":-:", ":-:"]);
      });
    });

    describe("that are not strings but objects", () => {
      it("should return the align center symbol", () => {
        expect(getHeaderDividers([2, null, undefined])).toStrictEqual([
          ":-:",
          ":-:",
          ":-:",
        ]);
      });
    });

    describe("that are objects", () => {
      it("should return the property align", () => {
        expect(
          getHeaderDividers([
            { title: "hola", align: "center" },
            { title: "hola1", align: "left" },
            { title: "hola2", align: "right" },
          ])
        ).toStrictEqual([":-:", ":-", "-:"]);
      });

      describe("and are empty or not conaining the property align", () => {
        it("should return the align center symbol", () => {
          expect(getHeaderDividers([{}, { title: "hola" }])).toStrictEqual([
            ":-:",
            ":-:",
          ]);
        });
      });
    });

    describe("that not correspond to some element of headers dictionary", () => {
      it("should return the align center symbol", () => {
        expect(getHeaderDividers(["Hi", "Bye"])).toStrictEqual([":-:", ":-:"]);
      });
    });

    describe("that are mixed strings", () => {
      it("should the corresponding align symbol or empty string", () => {
        expect(
          getHeaderDividers([
            "Name",
            "",
            "Required",
            { title: "hola", align: "right" },
          ])
        ).toStrictEqual([":-", ":-:", ":-:", "-:"]);
      });
    });
  });
});
