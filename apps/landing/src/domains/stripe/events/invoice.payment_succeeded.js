import {
  IAMClient,
  CreateUserCommand,
  AddUserToGroupCommand,
  CreateAccessKeyCommand,
} from "@aws-sdk/client-iam";
import Mailgun from "mailgun.js";
import formData from "form-data";
import { INCORRECT_PRODUCT } from "../errors";

const NEOADMIN_IAM_GROUP = "neoAdmin";
const client = new IAMClient({ region: "eu-west-1" });

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  url: "https://api.eu.mailgun.net",
});

const isNeoAdminProduct = (line) =>
  line.plan.product === process.env.STRIPE_NEOADMIN_PRODUCT;

export async function handler(event) {
  const { object } = event.data;

  if (object.lines.data.some(isNeoAdminProduct)) {
    const params = {
      UserName: `${object.customer}-neoAdmin`,
    };
    const createUserCommand = new CreateUserCommand(params);

    const addUserToGroupCommand = new AddUserToGroupCommand({
      ...params,
      GroupName: NEOADMIN_IAM_GROUP,
    });

    const createAccessKeyCommand = new CreateAccessKeyCommand(params);

    try {
      await client.send(createUserCommand);
      await client.send(addUserToGroupCommand);
      const { AccessKey } = await client.send(createAccessKeyCommand);
      const { AccessKeyId, SecretAccessKey } = AccessKey;

      const data = {
        from: "Mailgun Sandbox <postmaster@mailgun.neoadmin.neoco.dev>",
        to: object.customer_email,
        subject: "Thank you for your purchase!",
        template: "neoadmin-purchase",
        "h:X-Mailgun-Variables": JSON.stringify({
          firstname: object.customer_name,
          access_key: AccessKeyId,
          secret_key: SecretAccessKey,
        }),
      };

      await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    } catch (error) {
      console.error({ error });
      return { message: "Event not handled", error };
    }

    return { message: "Event handled" };
  }

  return { message: "Event not handled", error: INCORRECT_PRODUCT };
}
