import styled from "styled-components";
import { form, inputs } from "utils";
const { getComponent, getInput, getNewState } = form;

const Option = ({ ...props }) => {
  const { type, questions, visibleQuestionId, title, answer, answerId } = props;
  const isOtherOption =
    props.parsedSolutions.length - 1 === props.answerIndex && props.showOther;
  const optionKey = inputs.getAnswerInputKey({ isOtherOption, type, answerId });
  const AnswerComponent = getComponent(type);
  const AnswerInput = getInput(type);
  const isClickable = type === inputs?.radio || type === inputs?.checkbox;
  const isChecked = questions?.[visibleQuestionId]?.[optionKey] || false;

  return (
    <OptionContainer
      key={answer}
      onClick={() => handleClick({ isClickable, ...props })}
    >
      <AnswerInput
        name={title}
        id={answer}
        label={optionKey}
        checked={isChecked}
        onChange={() => {}}
      />
      <AnswerComponent checked={isChecked} onChange={() => {}} />
      <Label isClickable={isClickable} htmlFor={answer}>
        {answer}
      </Label>
    </OptionContainer>
  );
};

const handleClick = ({ isClickable, updateFormState, required, ...props }) => {
  const { title } = props;

  if (isClickable) {
    let currentQuestionState = {};
    const checkInputs = document.querySelectorAll(`input[name="${title}"]`);

    for (var i = 0; i < checkInputs.length; i++) {
      var item = checkInputs.item(i);
      const currentOption = item.attributes.label.value;

      currentQuestionState = {
        ...currentQuestionState,
        [currentOption]: item.checked,
      };
    }

    updateFormState(
      getNewState({
        ...props,
        currentQuestionState,
      })
    );
  }
};

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  min-width: calc(33% - 1rem);
  margin-bottom: 15px;
  cursor: pointer;
  color: #aeaeae;
  font-weight: 600;
  align-items: center;
  position: relative;
`;

const Label = styled.label`
  width: 100%;
  ${({ isClickable }) => (isClickable ? "cursor: pointer;" : "")}
`;

export default Option;
