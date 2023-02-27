import styled from "styled-components";
import { form, inputs } from "utils";
const { getInput, getNewState } = form;

const TextInput = ({
  type = "",
  placeholder = "",
  showTextInput = false,
  ...props
}) => {
  const { currentQuestion, showOther, required } = props;
  const TextInput = getInput(type);
  const inputValue =
    (showOther ? currentQuestion?.textAnswer : currentQuestion) || "";

  return (
    <Container>
      <TextInput
        {...(type === inputs?.email
          ? { required, ...inputs.inputProps.email }
          : {})}
        placeholder={placeholder}
        showTextInput={showTextInput}
        onChange={(event) => handleChange(event, props)}
        value={inputValue}
      />
    </Container>
  );
};

const handleChange = (
  event,
  { currentQuestion, updateFormState, ...props }
) => {
  updateFormState(
    getNewState({
      ...props,
      textInput: event.target.value || "",
      currentQuestionState: {
        ...currentQuestion,
        textAnswer: event.target.value,
      },
    })
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
`;

export default TextInput;
