import styled from "styled-components";
import { responsive } from "utils";
import { colors } from "styles";
import { Icon } from "components";
const { mediaQuery } = responsive;

const Card = ({ title = "", icon = "", ...props }) => {
  return (
    <CardContainer {...props}>
      <Icon
        height={30}
        className="icon"
        source="codexamples"
        name={icon}
        additionalStyles={{ minWidth: 30 }}
      />
      <TextContainer>
        <Title>{title}</Title>
      </TextContainer>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  border: 0.0625rem solid #0c0c0c;
  font-weight: 300;
  letter-spacing: 0.5px;
  min-height: 95px;

  ${({ $isSelected }) =>
    $isSelected
      ? `
      font-weight: 400;
      background-color: #1e1e1e; 
      cursor: default;`
      : `
        ${mediaQuery.DESKTOP`
          &:hover {
            background-color: #1e1e1e; 
          }
        `}
      `}
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  gap: 0.625rem;
`;

const Title = styled.div`
  color: ${colors.feature.title};
  font-weight: 500;
  color: #f0efef;
  font-family: "Roboto";
  letter-spacing: 0.5px;
`;
