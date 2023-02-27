import styled from 'styled-components';
import { colors } from 'styles';
import Arrow from 'public/icons/arrow.svg';

const Cards = ({ ...props }) => {
  return (
    <IconContainer {...props}>
      <ArrowIcon />
    </IconContainer>
  );
};

const IconContainer = styled.div`
  width: 30px;
  margin: auto;
  display: flex;
  justify-content: center;
  border: 3px solid;
  border-radius: 50%;
  cursor: pointer;
  ${({ disabled }) => (disabled ? 'opacity: 0.2; cursor: pointer;' : '')};
`;

const ArrowIcon = styled(Arrow)`
  fill: ${colors.white};
  width: auto;
  height: 24px;
  margin-left: 2px;
`;

export default Cards;
