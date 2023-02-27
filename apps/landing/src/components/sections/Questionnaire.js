import { useState } from 'react';
import { Section, Form, ActionButtons } from 'components';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { responsive, form } from 'utils';
const { mediaQuery } = responsive;
const { useFormState, initialFormStructure } = form;

const Questionnaire = ({
  sectionContent: { title = '', description = '', content = [] },
  general,
}) => {
  const template = 'help';
  const initialData = { visibleQuestionId: content[0].id };
  const [formObject, setFormObject] = useState(
    initialFormStructure(template, initialData),
  );

  const updateFormState = (newState) =>
    setFormObject((oldState) => ({ ...oldState, ...newState }));

  const { submitButtonDisabled, onSubmit } = useFormState({
    setFormObject,
    template,
    initialData,
  });

  return (
    <Section
      showTitleContainer={false}
      smallContent={true}
      containerStyle={{ minHeight: 450 }}>
      <Container>
        <FormIntroduction>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </FormIntroduction>

        <FormContainer
          onSubmit={(e) => onSubmit({ e, formObject, apiRequest: true })}>
          <AnimatePresence>
            <Form
              general={general}
              content={content}
              formObject={formObject}
              updateFormState={updateFormState}
            />
          </AnimatePresence>
          <ActionButtons
            {...general}
            {...formObject}
            content={content}
            formLength={content.length}
            updateFormState={updateFormState}
            submitButtonDisabled={submitButtonDisabled}
          />
        </FormContainer>
      </Container>
    </Section>
  );
};

export default Questionnaire;

const Container = styled.div`
  max-width: 880px;
  display: grid;
  gap: 2rem;
  grid-gap: 2rem;
  margin: auto;

  ${mediaQuery.DESKTOP`
    grid-auto-flow: column; 
  `}
`;

const FormIntroduction = styled.div``;

const Title = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 24px;
  line-height: 95%;
  color: #646464;
  font-weight: 500;
  margin-bottom: 1rem;

  ${mediaQuery.DESKTOP`
  font-size: 36px;
  font-weight: 400;
  color: #ffffff; 
  `}
`;

const Description = styled.div`
  text-align: left;
  vertical-align: top;
  color: #aeaeae;
  line-height: 125%;
`;

const FormContainer = styled.form`
  flex: 1;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${mediaQuery.DESKTOP`
  min-height: auto;
  `}
`;
