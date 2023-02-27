import { useState, useEffect } from "react";
import styled from "styled-components";
import { TextInput, TextareaInput } from "styles";
import Close from "public/icons/cross.svg";
import { motion } from "framer-motion";
import { responsive, form, inputs, translations, getNeocoUrl } from "utils";
const { mediaQuery } = responsive;
const { useFormState, initialFormStructure } = form;
const { getTranslations } = translations;

const Modal = ({
  isOpenModal = false,
  info: {
    title = "",
    description = "",
    textPlaceholder = "",
    textareaPlaceholder = "",
    showTextarea = true,
  },
  closeModal,
  template,
  apiRequest,
  submitButtonId,
}) => {
  const [formObject, setFormObject] = useState({});
  const [checked, setChecked] = useState(false);
  const { submitButtonDisabled, onSubmit } = useFormState({
    setFormObject,
    template,
    defaultDisabled: true,
  });
  const {
    general: { send },
    gdpr: { main, tos, and, privacy },
  } = getTranslations();

  const legalUrl = getNeocoUrl({ page: "legal" });
  const privacyUrl = getNeocoUrl({});

  useEffect(() => {
    setFormObject(initialFormStructure(template));

    if (!isOpenModal) setChecked(false);
  }, [isOpenModal]);

  return (
    isOpenModal && (
      <Container
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <FormContainer>
          <CloseIcon onClick={closeModal} />
          <Content>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <Form onSubmit={(e) => onSubmit({ e, formObject, apiRequest })}>
              <TextInput
                {...inputs.inputProps.email}
                showTextInput={true}
                placeholder={textPlaceholder}
                onChange={({ target }) =>
                  setFormObject((prevState) => ({
                    ...prevState,
                    email: target.value,
                  }))
                }
                value={formObject.email}
                required={true}
              />
              {showTextarea && (
                <TextareaInput
                  showTextInput={true}
                  placeholder={textareaPlaceholder}
                  name="message"
                  style={{ height: 150 }}
                  onChange={({ target }) =>
                    setFormObject((prevState) => ({
                      ...prevState,
                      message: target.value,
                    }))
                  }
                  value={formObject.message}
                  required={true}
                />
              )}
              <Gdpr for="gdpr">
                <input
                  id="gdpr"
                  type="checkbox"
                  defaultChecked={checked}
                  onChange={() => setChecked(!checked)}
                />
                {main}{" "}
                <a href={legalUrl} target="blank">
                  {tos}
                </a>{" "}
                {and}{" "}
                <a target="blank" href={privacyUrl}>
                  {privacy}
                </a>
              </Gdpr>
              <SubmitButton
                type="submit"
                disabled={submitButtonDisabled && !checked}
                submitButtonDisabled={submitButtonDisabled && !checked}
                id={submitButtonId}
              >
                {send}
              </SubmitButton>
            </Form>
          </Content>
        </FormContainer>
      </Container>
    )
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #1c1c1c;
  z-index: 2;
  justify-content: center;
  align-items: center;
  overscroll-behavior-y: contain;
  display: flex;
`;

const Form = styled.form`
  display: grid;
  flex-direction: column;
  gap: 30px;
`;

const Gdpr = styled.label`
  & > a {
    text-decoration: underline;

    &:hover {
      opacity: 0.5;
    }
  }
`;

const FormContainer = styled.div`
  width: 70%;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;

  ${mediaQuery.DESKTOP`
    position: relative;
    width: 360px;
    overflow: unset;
  `}
`;

const Content = styled.div`
  display: grid;
  flex-direction: column;
  gap: 30px;
`;

const Title = styled.div`
  font-size: 34px;
  color: #ababab;
  line-height: 95%;
  hyphens: auto;

  ${mediaQuery.DESKTOP`
  font-size: 48px;
  `}
`;

const Description = styled.div`
  color: #858585;
`;

const CloseIcon = styled(Close)`
  height: 25px;
  width: auto;
  position: absolute;
  top: 25px;
  right: 15%;
  cursor: pointer;

  ${mediaQuery.DESKTOP`
  top: -25px;
  right: -25px;
  `}
`;

const SubmitButton = styled.button`
  padding: 0.875rem 0.625rem;
  background-color: #fcff51;
  font-size: 16px;
  color: #0c0c0c;
  font-weight: 600;
  border: 0;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${({ submitButtonDisabled }) =>
    submitButtonDisabled
      ? `
    background-color: #646464;
    color: #1c1c1c;
    
    &:hover {
      opacity: 1;
    }`
      : ""}
`;

export default Modal;
