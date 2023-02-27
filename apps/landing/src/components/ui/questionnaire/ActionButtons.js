import styled from 'styled-components';
import { SendButton, NextButton, BackButton } from 'components';
import { responsive } from 'utils';
const { mediaQuery } = responsive;

const ActionButtons = ({
  back,
  next,
  send,
  warning: generalWarning,
  visibleQuestionIndex,
  visibleQuestionId,
  questions,
  updateFormState,
  formLength,
  content,
  submitButtonDisabled,
}) => {
  const currentContentQuestion = content[visibleQuestionIndex];
  const { warning = '', required = false } = currentContentQuestion;
  const currentQuestion = questions[visibleQuestionId];

  const isFirstQuestion = visibleQuestionIndex === 0;
  const isLastQuestion = visibleQuestionIndex + 1 === formLength;
  const isRequired = !!required;
  const isCurrentQuestionValid = Object.values(currentQuestion || {})?.some(
    (val) => val,
  );

  const canGoBack = !isFirstQuestion;
  const canGoNext = isRequired ? isCurrentQuestionValid : !isRequired;
  const warningMessage = warning || generalWarning;

  const handleBack = () => {
    if (canGoBack) {
      const backIndex = visibleQuestionIndex - 1;
      updateFormState({
        visibleQuestionIndex: backIndex,
        visibleQuestionId: content[backIndex].id,
        currentWarning: '',
      });
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      const nextIndex = visibleQuestionIndex + 1;
      updateFormState({
        visibleQuestionIndex: nextIndex,
        visibleQuestionId: content[nextIndex].id,
        currentWarning: '',
      });
    } else {
      updateFormState({ currentWarning: warningMessage });
    }
  };

  return (
    <ActionsContainer>
      <BackButton
        isFirstQuestion={isFirstQuestion}
        onClick={handleBack}
        text={back}
      />
      {!isLastQuestion && <NextButton onClick={handleNext} text={next} />}
      {isLastQuestion && (
        <SendButton
          type="submit"
          disabled={submitButtonDisabled}
          submitButtonDisabled={submitButtonDisabled}
          text={send}
          id="feedback"
        />
      )}
    </ActionsContainer>
  );
};

export default ActionButtons;

const ActionsContainer = styled.div`
  margin-top: 36px;
  display: flex;
  width: 100%;
  flex-direction: column;

  ${mediaQuery.TABLET`
    flex-direction: row;
    gap: 48px; 
    justify-content: flex-end;
  `}

  ${mediaQuery.DESKTOP`
    width: auto;
    justify-content: unset;
  `}
`;
