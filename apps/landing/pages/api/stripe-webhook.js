import { postRequest } from "../../src/domains/api/common";
import { eventBuilder } from "../../src/domains/stripe/event-builder";
import { eventHandler } from "../../src/domains/stripe/event-handler";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(request, response) {
  try {
    const event = await eventBuilder(request);
    await eventHandler(event);

    return response.status(200).send();
  } catch (err) {
    console.log({ err });
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
}

export default postRequest(handler);
