import styled from "styled-components";
import { Stack } from "@mui/material";
import { CTA, LandingTitle, LandingDescription } from "components";
import { responsive, modalVariant } from "utils";
import { colors } from "styles";
const { mediaQuery, useMediaQuery, breakpoints } = responsive;

const TopPage = ({ title, description, general, openModal }) => {
  const isTablet = useMediaQuery(breakpoints.TABLET);

  return (
    <Container>
      <InnerContainer>
        <TopLeft>
          <LandingTitle content={title} />
          <LandingDescription content={description} />
          {isTablet && (
            <Stack direction="column" spacing={2}>
              <CTA
                content={general?.cta}
                variant="big"
                id="joinlist"
                onClick={() => openModal(modalVariant.join)}
              />
              <CTA
                content={general?.cta}
                variant="big"
                styleType="livePreview"
                titleColor={colors.cta.background}
                id="joinlist"
                onClick={() => openModal(modalVariant.join)}
              />
            </Stack>
          )}
        </TopLeft>
        <TopRight>
          {!isTablet && (
            <Stack direction="column" spacing={2}>
              <CTA
                content={general?.cta}
                variant="big"
                id="joinlist"
                onClick={() => openModal(modalVariant.join)}
                style={{ marginRight: "auto" }}
              />
              <CTA
                content={general?.cta}
                variant="big"
                styleType="livePreview"
                titleColor={colors.cta.background}
                id="joinlist"
                onClick={() => openModal(modalVariant.join)}
                style={{ marginRight: "auto" }}
              />
            </Stack>
          )}
          <Screenshots
            src="/screenshots/landing-mosaic.png"
            alt="screenshots"
          />
        </TopRight>
        <div id="sentinel" style={{ visibility: "hidden" }} />
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  background: linear-gradient(180deg, #1e1e1e, black);
  overflow: hidden;
`;

const InnerContainer = styled.div`
  max-width: 1248px;
  margin: auto;
  overflow: initial;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
  gap: 2rem;
  height: 100vh;
  flex-wrap: wrap;
  padding: 0 1rem;
  padding-top: 130px;
  padding-bottom: 70px;

  ${mediaQuery.TABLET` 
    padding: 70px 2rem 0 2rem;
    align-content: center;
    flex-wrap: nowrap;
  `}

  ${mediaQuery.DESKTOP`  
    margin-top: 0;
    min-height: 100vh;
  `}
`;

const TopLeft = styled.div`
  max-width: 570px;
  display: grid;
  flex-direction: column;
  gap: 1rem;
  grid-gap: 1rem;

  ${mediaQuery.DESKTOP`
    padding: 0;
  `}
`;

const TopRight = styled.div`
  width: 100%;
  max-width: 570px;
  position: relative;

  ${mediaQuery.TABLET` 
    display: flex;
    flex-direction: column;
    gap 2rem;
    max-width: 50%;
  `};

  ${mediaQuery.DESKTOP` 
    padding: 0;
    width: 45%; 
    display: block;
  `};

  ${mediaQuery.RETINA`
    width: auto;
  `};
`;

const Screenshots = styled.img`
  width: 150%;
  margin-top: 2rem;
  transform: translate(-50%);
  left: 50%;
  position: absolute;

  ${mediaQuery.TABLET` 
    display: block; 
    width: auto;
    margin: auto;
    transform: translate(0);
    left: 0;
    position: initial;
  `}

  ${mediaQuery.DESKTOP` 
    width: auto;
  `};

  ${mediaQuery.RETINA`
    width: auto;
  `}
`;

export default TopPage;
