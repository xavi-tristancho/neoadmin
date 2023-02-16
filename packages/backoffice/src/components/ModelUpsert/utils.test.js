import { describe, it, expect } from "vitest";
import { beforeSave } from "./utils";

describe("reagarding the ModelUpsert utils", () => {
  describe("regarding the beforeSave function", () => {
    describe("given headers with a selector", () => {
      it("should automatically resolve the value", () => {
        const state = {
          data: {
            debtor: { value: 1, label: "Xavi Tristancho" },
            receiver: [
              { value: 2, label: "Joan Toni Morey" },
              { value: 3, label: "Marc Amer" },
            ],
          },
        };
        const header = {
          sections: [
            {
              fields: [
                {
                  property: "debtor",
                  type: "multiselect",
                },
              ],
            },
            {
              fields: [
                {
                  property: "receiver",
                  type: "multiselect",
                  relation: {
                    isMulti: true,
                  },
                },
              ],
            },
          ],
        };

        return beforeSave({ header, state }).then((nextState) => {
          expect(nextState).toEqual({
            debtor: 1,
            receiver: [
              { value: 2, label: "Joan Toni Morey" },
              { value: 3, label: "Marc Amer" },
            ],
          });
        });
      });
    });
  });
});
