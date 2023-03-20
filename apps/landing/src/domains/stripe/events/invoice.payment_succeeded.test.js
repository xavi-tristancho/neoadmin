import { describe, it, expect, vi } from "vitest";
import { handler } from "./invoice.payment_succeeded";
import { getEvent } from "../fixtures/invoice.payment_succeeded";
import { INCORRECT_PRODUCT } from "../errors";

function FakeCommand() {
  return () => {};
}

vi.mock("@aws-sdk/client-iam", () => ({
  IAMClient: function () {
    return {
      send: (Command) => {
        debugger;
        return Promise.resolve(Command());
      },
    };
  },
  CreateUserCommand: FakeCommand,
  AddUserToGroupCommand: FakeCommand,
  CreateAccessKeyCommand: function () {
    return () => ({
      AccessKey: {
        AccessKeyId: "fakeAccessKeyId",
        SecretAccessKey: "fakeSecretAccessKey",
      },
    });
  },
}));

vi.mock("mailgun.js", () => ({
  default: function () {
    return { client: () => ({ messages: { create: () => {} } }) };
  },
}));

describe("given the invoice.payment_succeeded event handler function", () => {
  describe("given the invoice.payment_succeeded event type", () => {
    it("should return an error if the invoice it's not from the correct product", async () => {
      const { error } = await handler(getEvent({ product: "test-product" }));

      expect(error).toEqual(INCORRECT_PRODUCT);
    });

    it("should return an event handled message if the invoice it's from the correct product", async () => {
      const { message } = await handler(getEvent());

      expect(message).toEqual("Event handled");
    });

    // it("should create an IAM account", async () => {
    //   await handler(event);
    // });
  });
});
