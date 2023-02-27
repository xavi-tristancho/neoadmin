import styled from 'styled-components';
import { arrow, ButtonText } from 'components';
import { Container as NextButtonContainer } from 'components/ui/buttons/NextButton';
import { responsive } from 'utils';
const { mediaQuery } = responsive;

const { BackArrowIcon } = arrow;

const BackButton = ({ text = '', ...props }) => {
  return (
    <Container {...props}>
      <BackArrowIcon />
      <ButtonText>{text}</ButtonText>
    </Container>
  );
};

const Container = styled(NextButtonContainer)`
  background-color: transparent;
  color: #aeaeae;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  &:hover {
    background-color: #3c3c3c;
  }
  border: 0;
  margin-bottom: 36px;

  ${mediaQuery.TABLET`
    margin-bottom: 0
  `}

  ${({ isFirstQuestion }) =>
    isFirstQuestion
      ? `
    opacity: 0.5; cursor: context-menu;
    
    &:hover {
      background-color: transparent;
    }
    `
      : ``}
`;

export default BackButton;
