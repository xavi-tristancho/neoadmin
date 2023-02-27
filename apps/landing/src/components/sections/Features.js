import { Section, Feature } from "components";
import styled from "styled-components";
const Features = ({
  sectionContent: { title = "", description = "", content = [] },
}) => (
  <Section
    id={"features"}
    title={title}
    description={description}
    descriptionStyle={{ maxWidth: "55%" }}
  >
    <FeaturesContainer>
      {content.map(({ title: featureTitle, ...props }) => (
        <Feature key={featureTitle} title={featureTitle} {...props} />
      ))}
    </FeaturesContainer>
  </Section>
);

export default Features;

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 64px;
  gap: 2rem;
`;

/*
&::after {
    content: "";
    flex: auto;
    margin-bottom: 45px;
    max-width: calc(33% - 2rem);
  }
*/
