import {
  IAMClient,
  CreateUserCommand,
  AddUserToGroupCommand,
  CreateAccessKeyCommand,
} from "@aws-sdk/client-iam";
import { INCORRECT_PRODUCT } from "../errors";

const NEOADMIN_IAM_GROUP = "neoAdmin";
const client = new IAMClient({ region: "eu-west-1" });

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

      // Send email
    } catch (error) {
      console.error({ error });
    }

    return { message: "Event handled" };
  }

  return { message: "Event not handled", error: INCORRECT_PRODUCT };
}
