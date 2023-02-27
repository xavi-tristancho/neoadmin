import { Section } from "components";
import styled from "styled-components";
import { colors } from "styles";

const Solutions = ({ sectionContent: { content = [] } }) => (
  <Section
    id={"solutions"}
    showTitleContainer={false}
    background={true}
    fitContent={true}
  >
    <Container>
      {content.map(({ title = "", description = "" }) => (
        <Solution key={title}>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Solution>
      ))}
    </Container>
  </Section>
);

export default Solutions;

const Container = styled.div`
  max-width: 880px;
  columns: 2;
  column-gap: 5rem;
  margin: auto;
`;

const Solution = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  break-inside: avoid;
  gap: 1rem;
`;

const Title = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 32px;

  color: ${colors.solutions.title};
  font-weight: 500;
`;

const Description = styled.div`
  text-align: left;
  vertical-align: top;
  font-family: "Roboto";
  color: ${colors.solutions.description};
  line-height: 150%;
  letter-spacing: 0.5px;
  font-weight: 300;
`;
