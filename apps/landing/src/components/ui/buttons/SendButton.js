import styled from 'styled-components';
import { arrow, ButtonText } from 'components';
import { Container as NextButtonContainer } from 'components/ui/buttons/NextButton';

const { ArrowIcon } = arrow;

const SendButton = ({ text = '', ...props }) => {
  return (
    <SubmitButton {...props}>
      <ButtonText>{text}</ButtonText>
      <ArrowIcon />
    </SubmitButton>
  );
};

const SubmitButton = styled.button`
  border: 1px solid;
  background-color: #feff9e;
  color: #0c0c0c;

  font-size: 16px;
  font-weight: 700;

  border: 0;
  border-radius: 0.0625rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 0.625rem;

  &:hover {
    background: #fcff51;
  }

  ${({ submitButtonDisabled }) =>
    submitButtonDisabled
      ? `
    background-color: #646464;
    color: #1c1c1c;
    cursor: context-menu;
    
    &:hover {
      opacity: 1;
    }`
      : ''}
`;

export default SendButton;
