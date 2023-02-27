const handleCardClick =
  (setSelectedElement, canGoBack, canGoNext) => (direction, newIndex) => {
    if (
      (direction === 'back' && canGoBack) ||
      (direction === 'next' && canGoNext)
    ) {
      return setSelectedElement(newIndex);
    }

    return false;
  };

const useSliderButtons = ({ elementsList, elementIndex }) => {
  const back = elementIndex - 1;
  const next = elementIndex + 1;
  const canGoBack = back >= 0;
  const canGoNext = next < elementsList.length;

  return { back, next, canGoBack, canGoNext };
};

export default { useSliderButtons, handleCardClick };
