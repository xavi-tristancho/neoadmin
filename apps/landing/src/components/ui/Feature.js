import styled from "styled-components";
import { colors } from "styles";
import { responsive } from "utils";
import { Icon } from "components";
const { mediaQuery } = responsive;

const Feature = ({ title = "", description = "", icon }) => {
  return (
    <Container>
      <Icon className="icon" name={icon} />
      <TitleContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TitleContainer>
    </Container>
  );
};

export default Feature;

const Container = styled.div`
  display: grid;
  gap: 1rem;
  grid-gap: 1rem;
  margin-bottom: 45px;
  grid-auto-flow: column;

  ${mediaQuery.TABLET`
    max-width: calc(50% - 2rem);
  `}

  ${mediaQuery.DESKTOP`
    max-width: calc(33% - 2rem);
  `}
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.3125rem;
`;

const Title = styled.div`
  color: ${colors.feature.title};
  font-weight: 600;
  color: #f0efef;
  padding-bottom: 0.7rem;
  font-family: "Roboto";
  letter-spacing: 0.5px;
`;

const Description = styled.div`
  color: ${colors.feature.title};
  font-family: "Roboto";
  font-weight: 300;
  line-height: 150%;
`;
