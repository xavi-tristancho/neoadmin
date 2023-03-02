import { Section } from "components";
import styled from "styled-components";
const LivePreview = ({
  sectionContent: { title = "klk", description = "", content = [] },
}) => (
  <Section
    id={"livePreview"}
    title={title}
    description={description}
    descriptionStyle={{ maxWidth: "55%" }}
  >
    <LivePreviewContainer></LivePreviewContainer>
  </Section>
);

export default LivePreview;

const LivePreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 64px;
  gap: 2rem;
`;
