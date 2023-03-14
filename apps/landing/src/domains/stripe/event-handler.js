import { handler } from "./events/invoice.payment_succeeded";

export async function eventHandler(event) {
  // Handle the event
  switch (event.type) {
    case "invoice.payment_succeeded":
      await handler(event);

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}
