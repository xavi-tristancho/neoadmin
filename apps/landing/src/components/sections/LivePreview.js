import { Stack } from "@mui/material";
import { Section, CTA } from "components";
import styled from "styled-components";
import { responsive } from "utils";
import { colors } from "styles";

const { mediaQuery } = responsive;

const LivePreview = ({
  sectionContent: { title = "", description = "", content = [] },
  general,
}) => (
  <Section
    id={"livePreview"}
    showTitleContainer={false}
    smallContent={true}
    descriptionStyle={{ maxWidth: "55%" }}
  >
    <Container>
      <TextContainer>
        <Stack direction="column" spacing={2}>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Stack>
        <CTA
          content={general?.livePreview}
          variant="big"
          styleType="livePreview"
          titleColor={colors.cta.background}
          id="joinlist"
          onClick={() =>
            window.open("https://neoadmin.neoco.dev/neoadmin-demo", "_blank")
          }
          style={{ marginTop: "3.5rem" }}
        />
      </TextContainer>
      <img
        src="/screenshots/small/dark/login.jpg"
        alt=""
        style={{ width: "100%", height: "100%" }}
      />
    </Container>
  </Section>
);

export default LivePreview;

const Container = styled.div`
  max-width: 920px;
  display: grid;
    grid-template-columns: 0.75fr 1fr;
  gap: 2rem;
  grid-gap: 2rem;
  margin: auto;

  ${mediaQuery.DESKTOP`
    grid-auto-flow: column; 
  `}
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 24px;
  line-height: 95%;
  color: #646464;
  font-weight: 500;
  margin-bottom: 1rem;

  ${mediaQuery.DESKTOP`
  font-size: 36px;
  font-weight: 400;
  color: #ffffff; 
  `}
`;

const Description = styled.div`
  text-align: left;
  vertical-align: top;
  color: #aeaeae;
  line-height: 125%;
`;
