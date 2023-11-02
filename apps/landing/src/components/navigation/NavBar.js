import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Languages, CoomingSoon, CTA } from "components";
import { motion } from "framer-motion";
import { responsive } from "utils";
const { mediaQuery, useMediaQuery, breakpoints } = responsive;
const { TABLET } = breakpoints;

const NavBar = ({ sectionContent: { cta = "" }, onClickModal }) => {
  const [showCta, setShowCta] = useState(false);
  const isTablet = useMediaQuery(TABLET);
  const showCtaRef = useRef(showCta);
  const setShowState = (data) => {
    showCtaRef.current = data;
    setShowCta(data);
  };

  const showAndHideCTA = () => {
    const top = 0;
    const scrollIsDownLandingCta =
      document.getElementById("sentinel").getBoundingClientRect().top < top;

    if (scrollIsDownLandingCta && !showCtaRef.current) {
      setShowState(true);
    } else if (!scrollIsDownLandingCta && showCtaRef.current) {
      setShowState(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", showAndHideCTA, false);
  }, []);

  return (
    <Container id="navbar">
      <Content showGap={showCta}>
        <LeftContainer>
          <CoomingSoon />
          {!isTablet && <Languages />}
        </LeftContainer>
        <RightContainer>
          {showCta && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ margin: "auto", width: "100%" }}
            >
              <CTA
                style={{ width: "100%" }}
                content={cta}
                variant="nav"
                onClick={onClickModal}
                id="joinlist"
              />
            </motion.div>
          )}
          {isTablet && <Languages />}
        </RightContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: fixed;
  background: #1c1c1cde;
  backdrop-filter: blur(50px);
  top: ${({ home }) => (home ? "-100px" : "0")};
  width: 100%;
  max-width: 100%;
  padding: 10px 0;
  transition: top 0.3s;
  z-index: 1;
  align-items: center;
`;

const Content = styled.div`
  display: grid;
  grid-auto-flow: row;
  width: 100%;
  margin: 1rem auto;
  padding: 0 1rem;
  ${({ showGap }) => (showGap ? "grid-gap: 2rem;" : "grid-gap: 0;")}

  ${mediaQuery.TABLET` 
  justify-content: space-between;
  grid-auto-flow: column;
  padding: 0 2rem;
  margin: 0 auto;
  `}

  ${mediaQuery.DESKTOP`
  max-width: 1248px;
  `}
`;

const LeftContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2rem;
  justify-content: space-between;
`;

const RightContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2rem;
`;

export default NavBar;
