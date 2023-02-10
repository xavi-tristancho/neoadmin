import { getRows } from "./tableParser";

describe("regarding the getRows function", () => {
  describe("given an array of rows", () => {
    describe("that is unidimensional", () => {
      describe("which each element is a string with no special characters", () => {
        it("should return a string with all the elements divided by a vertical bar", () => {
          expect(getRows(["type", "CRUD"])).toStrictEqual(`|type|CRUD|`);
        });
      });

      describe("which each element is a string with special characters", () => {
        describe("should return a string with all the elements divided by a vertical bar", () => {
          it("with the special characters scaped", () => {
            expect(getRows(["`required`", "`true`"])).toStrictEqual(
              `|\`required\`|\`true\`|`,
            );

            //In markdown is required to double scape backslash bars
            expect(getRows(["`true` | `false`"])).toStrictEqual(
              `|\`true\` \\| \`false\`|`,
            );
          });
        });
      });

      describe("with mixed elements", () => {
        it("should return all the elements divided by a vertical bar", () => {
          expect(getRows([[], "`required`", 2, {}, "`true`"])).toStrictEqual(
            `||\`required\`|2||\`true\`|`,
          );
        });
      });
    });

    describe("that is multidimensional", () => {
      describe("which each element is a string with no special characters", () => {
        it("should return a string with all the elements divided by a vertical bar", () => {
          expect(
            getRows([
              ["type", "CRUD"],
              ["type", "CRUD"],
            ]),
          ).toStrictEqual(`|type|CRUD|\n|type|CRUD|`);
        });
      });

      describe("which each element is a string with special characters", () => {
        describe("should return a string with all the elements divided by a vertical bar", () => {
          it("with the special characters scaped", () => {
            expect(
              getRows([
                ["`required`", "`true`"],
                ["`required`", "`true`"],
              ]),
            ).toStrictEqual(`|\`required\`|\`true\`|\n|\`required\`|\`true\`|`);
          });
        });
      });

      describe("with mixed elements", () => {
        it("should return all the elements divided by a vertical bar", () => {
          expect(
            getRows([
              ["type", "CRUD"],
              ["`required`", "`true`"],
              [2, {}],
            ]),
          ).toStrictEqual(`|type|CRUD|\n|\`required\`|\`true\`|\n|2||`);
        });
      });
    });
  });
});
