import { Card, CardButtons } from 'components';
import SwipeableViews from 'react-swipeable-views';
import { responsive, slider } from 'utils';
import styled from 'styled-components';
const { useSliderButtons, handleCardClick } = slider;
const { useMediaQuery, breakpoints } = responsive;
const { DESKTOP, TABLET } = breakpoints;

const Cards = ({ cards, selectedCard, setSelectedCard }) => {
  const isDesktop = useMediaQuery(DESKTOP);
  const isTablet = useMediaQuery(TABLET);
  const { back, next, canGoBack, canGoNext } = useSliderButtons({
    elementsList: cards,
    elementIndex: selectedCard,
  });
  const handleClick = handleCardClick(setSelectedCard, canGoBack, canGoNext);

  const styles = {
    root: {
      ...(isTablet ? { paddingRight: '60%' } : {}),
    },
  };

  const cardComponents = cards.map((unused, key) => {
    const { title, icon } = cards[key];

    return (
      <Card
        key={title}
        icon={icon}
        title={title}
        $isSelected={selectedCard === key}
        onClick={() => setSelectedCard(key)}
      />
    );
  });

  return !isDesktop ? (
    <Container>
      <CardButtons
        disabled={!canGoBack}
        onClick={() => handleClick('back', back)}
        style={{ transform: 'rotate(180deg)' }}
      />
      <SwipeableViews
        style={styles.root}
        enableMouseEvents={true}
        index={selectedCard}
        onChangeIndex={(index) => setSelectedCard(index)}>
        {cardComponents}
      </SwipeableViews>

      <CardButtons
        disabled={!canGoNext}
        onClick={() => handleClick('next', next)}
      />
    </Container>
  ) : (
    cardComponents
  );
};

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: 20px;
`;

export default Cards;
