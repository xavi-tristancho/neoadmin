export const isObject = (value) =>
  typeof value === "object" && !Array.isArray(value) && value !== null;

export const getSelectedOptions = (options) =>
  isObject(options)
    ? Object.entries(options)
        .filter(([unused, value]) => !!value)
        .map(([key, unused]) => key)
        .join()
    : options;

export const getObjectProps = (item) => {
  const [key, val] = [].concat.apply([], Object.entries(item));
  return { [key]: val };
};

export const getFlatOptionsObject = (options) =>
  options.reduce((obj, item) => Object.assign(obj, getObjectProps(item)), {});

function makeid(length) {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const generateAnonEmail = () => `${makeid(5)}@app-artisans.dev`;

export const getAnswers = (formObject, template) => {
  const { questions, email = generateAnonEmail() } = formObject;

  if (template === "join") {
    return {
      answers: { email },
      action: template,
    };
  }

  const selectedOptions = Object.entries(questions).map(([key, value]) => ({
    [key]: getSelectedOptions(value),
  }));

  return {
    answers: { email, ...getFlatOptionsObject(selectedOptions) },
    action: template,
  };
};
