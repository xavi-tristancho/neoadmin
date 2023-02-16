import { describe, it, expect } from "vitest";
import { getCellDividers } from "./tableParser";

describe("regarding the getCellDividers function", () => {
  describe("given an array of headers", () => {
    describe("that are strings", () => {
      describe("that correspond to some element of headers dictionary", () => {
        it("should return all strings joined", () => {
          expect(getCellDividers(["Name", "Required"])).toStrictEqual(
            "|Name|Required|"
          );
        });
        describe("showBottomDividers is false", () => {
          it("should return all strings joined", () => {
            expect(getCellDividers(["Name", "Required"], false)).toStrictEqual(
              "|Name|Required|"
            );
          });
        });
        describe("showBottomDividers is true", () => {
          it("should return all strings joined with a bottom divider", () => {
            expect(getCellDividers(["Name", "Required"], true)).toStrictEqual(
              `|Name|Required|\n|:-|:-:|`
            );
          });
        });
      });

      describe("that not correspond to some element of headers dictionary", () => {
        it("should return all strings joined", () => {
          expect(getCellDividers(["Hi", "Bye"])).toStrictEqual("|Hi|Bye|");
        });
        describe("showBottomDividers is false", () => {
          it("should return all strings joined", () => {
            expect(getCellDividers(["Hi", "Bye"], false)).toStrictEqual(
              "|Hi|Bye|"
            );
          });
        });
        describe("showBottomDividers is true", () => {
          it("should return all strings joined with a center bottom divider", () => {
            expect(getCellDividers(["Hi", "Bye"], true)).toStrictEqual(
              `|Hi|Bye|\n|:-:|:-:|`
            );
          });
        });
      });
    });

    describe("that are empty strings", () => {
      it("should return empty strings joined with vertical bar dividers", () => {
        expect(getCellDividers(["", ""])).toStrictEqual("|||");
      });

      describe("showBottomDividers is true", () => {
        it("should return empty strings joined with vertical bar dividers and with a center bottom divider", () => {
          expect(getCellDividers(["", ""], true)).toStrictEqual(
            `|||\n|:-:|:-:|`
          );
        });
      });
    });

    describe("that are not strings, objects or numbers", () => {
      it("should return empty strings joined with vertical bar dividers", () => {
        expect(getCellDividers([[], null, undefined])).toStrictEqual("||||");
      });

      describe("showBottomDividers is true", () => {
        it("should return empty strings joined with vertical bar dividers and with a bottom divider", () => {
          expect(getCellDividers([[], null, undefined], true)).toStrictEqual(
            `||||\n|:-:|:-:|:-:|`
          );
        });
      });
    });

    describe("that are objects", () => {
      it("should return all the title properties joined as string", () => {
        expect(
          getCellDividers([
            { title: "hola", align: "center" },
            { title: "hola1", align: "left" },
            { title: "hola2", align: "right" },
          ])
        ).toStrictEqual(`|hola|hola1|hola2|`);
      });

      describe("and are empty or not conaining the property title", () => {
        it("should return empty strings with vertical bar dividers", () => {
          expect(getCellDividers([{}, { align: "center" }])).toStrictEqual(
            `|||`
          );
        });
      });

      describe("with the prop showBottomDividers true", () => {
        it("should return all strings joined with a bottom divider", () => {
          expect(
            getCellDividers(
              [
                { title: "hola", align: "center" },
                { title: "hola1", align: "left" },
                { title: "hola2", align: "right" },
              ],
              true
            )
          ).toStrictEqual(`|hola|hola1|hola2|\n|:-:|:-:|:-:|`);
        });
      });
    });
  });
});
