const mailchimp = require("@mailchimp/mailchimp_marketing");
var crypto = require("crypto");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us20",
});

export default async function (req, res) {
  const { email, ...answers } = req.body.answers;

  try {
    const emailmd5 = crypto.createHash("md5").update(email).digest("hex");

    await mailchimp.lists.setListMember("04cec9b476", emailmd5, {
      email_address: email,
      status: "subscribed",
      merge_fields: answers,
      tags: [req.body.template],
    });
    return res.json({ status: "ok" });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }
}
