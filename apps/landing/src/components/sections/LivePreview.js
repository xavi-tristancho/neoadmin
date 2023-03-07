import { Stack } from "@mui/material";
import { Section, CTA } from "components";
import styled from "styled-components";
import { responsive } from "utils";
import { colors } from "styles";
import { openDemoLink } from "utils/openDemoLink";

const { mediaQuery, useMediaQuery, breakpoints } = responsive;

const LivePreview = ({
  sectionContent: { title = "", description = "", content = [] },
  general,
}) => {
  const isTablet = useMediaQuery(breakpoints.TABLET);

  return (
    <Section showTitleContainer={false} background={true} fitContent={true}>
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
            onClick={openDemoLink}
            style={{ marginTop: "3rem" }}
          />
        </TextContainer>
        {isTablet && (
          <img
            src="/screenshots/large/dark/login.jpg"
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </Container>
    </Section>
  );
};

export default LivePreview;

const Container = styled.div`
  grid-auto-flow: column;

  ${mediaQuery.TABLET`
 max-width: 920px;
  display: grid;
  grid-template-columns: 0.75fr 1fr;
  grid-gap: 5rem;
  margin: auto;
`}
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
