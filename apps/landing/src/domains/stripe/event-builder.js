import getRawBody from "raw-body";
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const STRIPE_SIGNATURE_HEADER = "stripe-signature";

export async function eventBuilder(request) {
  const signature = request.headers[STRIPE_SIGNATURE_HEADER];
  const rawBody = await getRawBody(request);

  return stripe.webhooks.constructEvent(
    rawBody,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET_KEY
  );
}
