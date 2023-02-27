import styled from 'styled-components';
import { arrow, ButtonText } from 'components';

const { ArrowIcon } = arrow;

const NextButton = ({ text = '', ...props }) => {
  return (
    <Container {...props}>
      <ButtonText>{text}</ButtonText>
      <ArrowIcon color="#0c0c0c" />
    </Container>
  );
};

export const Container = styled.div`
  border-radius: 0.0625rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  font-weight: 600;
  color: #0c0c0c;
  cursor: pointer;
  background-color: #feff9e;

  &:hover {
    background-color: #fcff51;
  }
`;

export default NextButton;
