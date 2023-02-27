import { useState } from "react";
import { Section, ImageModal, CardButtons } from "components";
import styled from "styled-components";
import SwipeableViews from "react-swipeable-views";
import { responsive, slider, translations } from "utils";
const { getTranslations } = translations;
const { useSliderButtons, handleCardClick } = slider;
const { mediaQuery, useMediaQuery, breakpoints } = responsive;
const { TABLET } = breakpoints;

const content = [
  "dark/login.jpg",
  "dark/table.jpg",
  "dark/form.jpg",
  "dark/custom-page.jpg",
  "light/login.jpg",
  "light/table.jpg",
  "light/form.jpg",
  "light/custom-page.jpg",
  "light/overview.jpg",
];

const Code = () => {
  const id = "images";
  const {
    general: { simplePreview },
  } = getTranslations();
  const [selectedImage, setSelectedImage] = useState(0);
  const [open, setOpen] = useState(false);
  const { back, next, canGoBack, canGoNext } = useSliderButtons({
    elementsList: content,
    elementIndex: selectedImage,
  });
  const handleClick = handleCardClick(setSelectedImage, canGoBack, canGoNext);
  const isTablet = useMediaQuery(TABLET);

  const largeImagePath = (imageSrc) => `/screenshots/large/${imageSrc}`;
  const imagesList = content.map((imageSrc) => largeImagePath(imageSrc));

  return (
    <>
      <ImageModal
        open={open}
        setOpen={setOpen}
        setSelectedImage={setSelectedImage}
        photoIndex={selectedImage}
        imagesList={imagesList}
      />
      <Section
        id={id}
        title={simplePreview}
        showDescription={false}
        background={true}
        containerStyle={{ boxSizing: "content-box" }}
      >
        <Container>
          <MobileButtonsContainer>
            <CardButtonContainer
              disabled={!canGoBack}
              onClick={() => handleClick("back", back)}
            >
              <CardButtons
                disabled={!canGoBack}
                style={{ transform: "rotate(180deg)" }}
              />
            </CardButtonContainer>
            {!isTablet && (
              <CardButtonContainer
                disabled={!canGoNext}
                onClick={() => handleClick("next", next)}
              >
                <CardButtons disabled={!canGoNext} />
              </CardButtonContainer>
            )}
          </MobileButtonsContainer>
          <SwipeableViews index={selectedImage}>
            {content.map((imageSrc) => {
              const smallImagePath = `/screenshots/small/${imageSrc}`;
              return (
                <ScreenshotContainer>
                  <Screenshot
                    onClick={() => setOpen(true)}
                    src={smallImagePath}
                  />
                </ScreenshotContainer>
              );
            })}
          </SwipeableViews>
          {isTablet && (
            <CardButtonContainer
              disabled={!canGoNext}
              onClick={() => handleClick("next", next)}
            >
              <CardButtons disabled={!canGoNext} />
            </CardButtonContainer>
          )}
        </Container>
      </Section>
    </>
  );
};

export default Code;

const MobileButtonsContainer = styled.div`
  display: grid;
  background-color: #1e1e1e;
  justify-content: flex-end;
  grid-auto-flow: column;
  grid-gap: 10vw;

  ${mediaQuery.TABLET`
    display: block;
    background-color: transparent;
  `}
`;

const Container = styled.div`
  grid-auto-flow: column;

  ${mediaQuery.TABLET`
    display: grid;
  `}
`;

const CardButtonContainer = styled.button`
  height: 100%;
  background: #1e1e1e;
  padding: 1rem;
  justify-content: center;
  display: flex;
  cursor: pointer;
  border: 0;
  color: white;

  ${({ disabled }) =>
    disabled
      ? ""
      : `&:hover {
    opacity: 0.5;
  }`};
`;

const ScreenshotContainer = styled.div`
  cursor: zoom-in;
  height: 100%;
  display: flex;
  overflow: hidden;
  justify-content: center;
`;

const Screenshot = styled.img`
  width: 150%;
  height: auto;
`;
