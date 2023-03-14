export function getEvent({
  product = process.env.STRIPE_NEOADMIN_PRODUCT,
} = {}) {
  return {
    id: "evt_1MlZtWDmbpVXETUoFFBKFJ0p",
    object: "event",
    api_version: "2022-11-15",
    created: 1678808169,
    data: {
      object: {
        id: "in_1MlZtSDmbpVXETUoLJH514Xe",
        object: "invoice",
        account_country: "ES",
        account_name: "Neoco",
        account_tax_ids: null,
        amount_due: 30000,
        amount_paid: 30000,
        amount_remaining: 0,
        amount_shipping: 0,
        application: null,
        application_fee_amount: null,
        attempt_count: 1,
        attempted: true,
        auto_advance: false,
        automatic_tax: { enabled: true, status: "complete" },
        billing_reason: "subscription_create",
        charge: "ch_3MlZtTDmbpVXETUo3WPi4D3N",
        collection_method: "charge_automatically",
        created: 1678808166,
        currency: "eur",
        custom_fields: null,
        customer: "cus_NWd9zdPPZBLSnX",
        customer_address: {
          city: "Manacor",
          country: "ES",
          line1: "Carrer Cirerer, 26",
          line2: null,
          postal_code: "07500",
          state: "PM",
        },
        customer_email: "xavitb3@gmail.com",
        customer_name: "Xavier Tristancho Bordoy",
        customer_phone: null,
        customer_shipping: null,
        customer_tax_exempt: "none",
        customer_tax_ids: [],
        default_payment_method: null,
        default_source: null,
        default_tax_rates: [],
        description: null,
        discount: null,
        discounts: [],
        due_date: null,
        ending_balance: 0,
        footer: null,
        from_invoice: null,
        hosted_invoice_url:
          "https://invoice.stripe.com/i/acct_1Ml8MxDmbpVXETUo/test_YWNjdF8xTWw4TXhEbWJwVlhFVFVvLF9OV2Q5aFhtVFhNRjFPODZlQURha1o2YUpia095VGRTLDY5MzQ4OTcw0200GxEeWCUb?s=ap",
        invoice_pdf:
          "https://pay.stripe.com/invoice/acct_1Ml8MxDmbpVXETUo/test_YWNjdF8xTWw4TXhEbWJwVlhFVFVvLF9OV2Q5aFhtVFhNRjFPODZlQURha1o2YUpia095VGRTLDY5MzQ4OTcw0200GxEeWCUb/pdf?s=ap",
        last_finalization_error: null,
        latest_revision: null,
        lines: {
          object: "list",
          data: [
            {
              id: "il_1MlZtSDmbpVXETUo5J1KgDmV",
              object: "line_item",
              amount: 30000,
              amount_excluding_tax: 30000,
              currency: "eur",
              description: "1 × neoAdmin (at €300.00 / year)",
              discount_amounts: [],
              discountable: true,
              discounts: [],
              livemode: false,
              metadata: {},
              period: { end: 1710430566, start: 1678808166 },
              plan: {
                id: "price_1MlZUJDmbpVXETUo79e2WVY8",
                object: "plan",
                active: true,
                aggregate_usage: null,
                amount: 30000,
                amount_decimal: "30000",
                billing_scheme: "per_unit",
                created: 1678806607,
                currency: "eur",
                interval: "year",
                interval_count: 1,
                livemode: false,
                metadata: {},
                nickname: null,
                product,
                tiers_mode: null,
                transform_usage: null,
                trial_period_days: null,
                usage_type: "licensed",
              },
              price: {
                id: "price_1MlZUJDmbpVXETUo79e2WVY8",
                object: "price",
                active: true,
                billing_scheme: "per_unit",
                created: 1678806607,
                currency: "eur",
                custom_unit_amount: null,
                livemode: false,
                lookup_key: null,
                metadata: {},
                nickname: null,
                product,
                recurring: {
                  aggregate_usage: null,
                  interval: "year",
                  interval_count: 1,
                  trial_period_days: null,
                  usage_type: "licensed",
                },
                tax_behavior: "inclusive",
                tiers_mode: null,
                transform_quantity: null,
                type: "recurring",
                unit_amount: 30000,
                unit_amount_decimal: "30000",
              },
              proration: false,
              proration_details: { credited_items: null },
              quantity: 1,
              subscription: "sub_1MlZtSDmbpVXETUoT2se3NPY",
              subscription_item: "si_NWd9jDlMeXMojT",
              tax_amounts: [
                {
                  amount: 0,
                  inclusive: true,
                  tax_rate: "txr_1MlZV8DmbpVXETUoMlLvg6FN",
                },
              ],
              tax_rates: [],
              type: "subscription",
              unit_amount_excluding_tax: "30000",
            },
          ],
          has_more: false,
          total_count: 1,
          url: "/v1/invoices/in_1MlZtSDmbpVXETUoLJH514Xe/lines",
        },
        livemode: false,
        metadata: {},
        next_payment_attempt: null,
        number: "FE342FDC-0002",
        on_behalf_of: null,
        paid: true,
        paid_out_of_band: false,
        payment_intent: "pi_3MlZtTDmbpVXETUo3ih6Zcwy",
        payment_settings: {
          default_mandate: null,
          payment_method_options: null,
          payment_method_types: null,
        },
        period_end: 1678808166,
        period_start: 1678808166,
        post_payment_credit_notes_amount: 0,
        pre_payment_credit_notes_amount: 0,
        quote: null,
        receipt_number: null,
        rendering_options: null,
        shipping_cost: null,
        shipping_details: null,
        starting_balance: 0,
        statement_descriptor: null,
        status: "paid",
        status_transitions: {
          finalized_at: 1678808166,
          marked_uncollectible_at: null,
          paid_at: 1678808169,
          voided_at: null,
        },
        subscription: "sub_1MlZtSDmbpVXETUoT2se3NPY",
        subtotal: 30000,
        subtotal_excluding_tax: 30000,
        tax: 0,
        test_clock: null,
        total: 30000,
        total_discount_amounts: [],
        total_excluding_tax: 30000,
        total_tax_amounts: [
          {
            amount: 0,
            inclusive: true,
            tax_rate: "txr_1MlZV8DmbpVXETUoMlLvg6FN",
          },
        ],
        transfer_data: null,
        webhooks_delivered_at: null,
      },
    },
    livemode: false,
    pending_webhooks: 2,
    request: {
      id: "req_S3uvaDJjAqIHUx",
      idempotency_key: "86a17be0-5bf6-445b-9ac1-6c48f9c7043f",
    },
    type: "invoice.payment_succeeded",
  };
}
