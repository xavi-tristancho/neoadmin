const inputs = {
  radio: "radio",
  checkbox: "checkbox",
  textarea: "textarea",
  text: "text",
  email: "email",
};

const isTextInput = (type) =>
  type === inputs?.text || type === inputs?.textarea || type === inputs?.email;

const inputProps = {
  email: {
    type: "email",
    name: "email",
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
  },
};

const getAnswerInputKey = ({ isOtherOption, type, answerId }) => {
  if (isOtherOption) {
    return "aOther";
  } else if (type === inputs?.email) {
    return "email";
  }
  return answerId;
};

export default {
  ...inputs,
  inputProps,
  isTextInput,
  getAnswerInputKey,
};
