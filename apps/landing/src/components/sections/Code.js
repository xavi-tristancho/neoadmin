import { useState } from 'react';
import { Section, CodeAndPreview, Cards, Switch, ImageModal } from 'components';
import styled from 'styled-components';
import { responsive } from 'utils';
const { mediaQuery, useMediaQuery, breakpoints } = responsive;
const { DESKTOP } = breakpoints;

const Code = ({ sectionContent }) => {
  const id = 'code';
  const [selectedCard, setSelectedCard] = useState(0);
  const [switchState, setSwitchState] = useState(id);
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery(DESKTOP);

  const { content, title: sectionTitle } = sectionContent;
  const { title, description, code, imageSrc } = content[selectedCard];

  const smallImagePath = `/screenshots/small/dark/${imageSrc}`;
  const largeImagePath = (imageSrc) => `/screenshots/large/dark/${imageSrc}`;
  const imagesList = content.map(({ imageSrc }) => largeImagePath(imageSrc));

  return (
    <>
      <ImageModal
        open={open}
        setOpen={setOpen}
        setSelectedImage={setSelectedCard}
        photoIndex={selectedCard}
        imagesList={imagesList}
        imageTitle={`${title}: ${description}`}
      />
      <Section
        id={id}
        title={sectionTitle}
        showDescription={false}
        background={true}>
        <Container>
          <LeftSide>
            <CodeAndPreview
              codeContent={code}
              src={smallImagePath}
              switchState={switchState}
              setOpen={setOpen}
            />
          </LeftSide>
          {!isDesktop && <Description>{description}</Description>}
          <RightSide>
            <Cards
              cards={content}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
            />
          </RightSide>
          {!isDesktop && (
            <Switch switchState={switchState} setSwitchState={setSwitchState} />
          )}
        </Container>
        <BottomContainer>
          <Description>{description}</Description>
          <Switch switchState={switchState} setSwitchState={setSwitchState} />
        </BottomContainer>
      </Section>
    </>
  );
};

export default Code;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 11px 0px;
  grid-template-areas:
    'b'
    'c'
    'a'
    'd';
  padding-bottom: 55px;

  ${mediaQuery.DESKTOP`
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 0 1rem;
    grid-template-areas: "a a a a a a b b";
    padding-bottom: 0;
  `}
`;

const LeftSide = styled.div`
  grid-area: a;
`;

const RightSide = styled.div`
  grid-area: b;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 100%;
`;

const BottomContainer = styled.div`
  display: none;
  grid-template-rows: 1fr;
  grid-gap: 0 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas: 'a a a a a a b b b c c';
  margin-top: 1rem;

  ${mediaQuery.DESKTOP`
    display: grid; 
  `}
`;

const Description = styled.div`
  grid-area: c;
  padding: 16px 0;

  display: flex;
  align-items: flex-start;
  max-width: 545px;
  font-family: 'Roboto';
  font-size: 1.05rem;
  font-weight: 300;
  line-height: 125%;
  min-height: 65px;

  ${mediaQuery.TABLET`
    padding: 0 1rem;
  `}

  ${mediaQuery.DESKTOP`
    grid-area: a;
    padding: 0;
    padding-right: 2rem;
  `}
`;
