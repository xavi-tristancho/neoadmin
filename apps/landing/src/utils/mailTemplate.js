const mailTemplate = (req, translations, template) => {
  const {
    contactingUserInfo,
    message,
    subject,
    mail,
    [template]: tempSubject,
  } = translations;

  const headers = {
    from: req.body.answers.email,
    to: "info@app-artisans.dev",
    envelope: {
      from: "info@app-artisans.dev",
      to: "info@app-artisans.dev",
    },
    subject: `${subject} ${req.body.answers.email}`,
    text: `${mail}: ${req.body.answers.email}, ${message}: ${req.body.answers.message}`,
  };

  const body = {
    html: `
  ${contactingUserInfo}: <br /> 
  ${mail}: <b>${req.body.answers.email}</b> <br /> 
  <br />
  ${message}:
  <p>${req.body.answers.message}</p>
  `,
  };

  switch (template) {
    case "questions":
    case "custom-work":
      return {
        ...headers,
        subject: `${tempSubject} - ${subject} ${req.body.answers.email}`,
        ...body,
      };

    default:
      return {
        ...headers,
        ...body,
      };
  }
};

export default mailTemplate;
