import styled from 'styled-components';
import { motion } from 'framer-motion';
import { inputs } from 'utils';
import { Option, TextInput } from 'components';
import { responsive } from 'utils';
const { mediaQuery } = responsive;

const Form = ({
  content = [],
  formObject: {
    visibleQuestionIndex,
    visibleQuestionId,
    currentWarning,
    questions,
  },
  general: { other },
  updateFormState,
}) =>
  content?.map(
    (
      {
        title,
        type,
        solutions = [],
        showOther = false,
        required = false,
        ...props
      },
      index,
    ) => {
      const currentQuestion = questions?.[visibleQuestionId];
      const showQuestion = visibleQuestionIndex === index;
      const showSolutions = solutions.length > 0;
      const isOtherSelected = currentQuestion?.aOther;
      const showTextInput =
        (showOther && isOtherSelected) || inputs?.isTextInput(type);
      const textInputPlaceholder =
        props?.otherPlaceholder || props?.placeholder || '';
      const textInputType = inputs?.isTextInput(type) ? type : inputs?.text;
      const parsedSolutions = showOther ? [...solutions, other] : solutions;

      const commonProps = {
        title,
        questions,
        required,
        updateFormState,
        visibleQuestionId,
        showOther,
      };

      return (
        showQuestion && (
          <motion.div
            key={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%' }}>
            <Question>{title}</Question>
            <Warning>{currentWarning}</Warning>
            <AnswerContainer>
              {showSolutions &&
                parsedSolutions?.map((answer, innerIndex) => (
                  <Option
                    key={innerIndex}
                    {...{
                      type,
                      answer: answer.text,
                      answerId: answer.id,
                      answerIndex: innerIndex,
                      isOtherSelected,
                      parsedSolutions,
                      ...commonProps,
                    }}
                  />
                ))}

              <TextInput
                {...{
                  type: textInputType,
                  placeholder: textInputPlaceholder,
                  showTextInput,
                  currentQuestion,
                  ...commonProps,
                }}
              />
            </AnswerContainer>
          </motion.div>
        )
      );
    },
  );

export default Form;

const Question = styled.div`
  vertical-align: top;
  font-size: 24px;
  color: #ffffff;
  line-height: 125%;
`;

const Warning = styled.div`
  text-align: left;
  vertical-align: top;
  line-height: auto;
  color: #ff8f8f;
  margin-top: 0.3rem;
  min-height: 20px;
`;

const AnswerContainer = styled.div`
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  width: 100%; 

  ${mediaQuery.DESKTOP`
  width: 88%;
  `}

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;
