import styled from "styled-components";
import { translations, responsive } from "utils";
const { getTranslations } = translations;
const { mediaQuery } = responsive;

const Switch = ({ switchState, setSwitchState }) => {
  const {
    general: { code, preview },
  } = getTranslations();

  const isSelected = (text) => switchState === text;
  const setNewState = (newState) =>
    switchState !== newState ? setSwitchState(newState) : "";

  return (
    <Container>
      <Text selected={isSelected("code")} onClick={() => setNewState("code")}>
        {code}
      </Text>
      <Separator />
      <Text
        selected={isSelected("preview")}
        onClick={() => setNewState("preview")}
      >
        {preview}
      </Text>
    </Container>
  );
};

export default Switch;

const Container = styled.div`
  grid-area: d;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 0.0625rem solid #7c7c7c;
  justify-content: space-around;
  font-size: 0.9rem;
  padding: 0.5rem;
  height: 40px;

  ${mediaQuery.DESKTOP`
    grid-area: b;
  `}
`;

const Text = styled.div`
  cursor: default;
  padding: 0 0.5rem;
  font-weight: 500;
  ${({ selected }) =>
    !selected
      ? `
  cursor: pointer; 
  color: #7c7c7c;
  &:hover { 
    color: white; 
 }`
      : ``}
`;

const Separator = styled.div`
  height: 100%;
  width: 1px;
  background: #7c7c7c;
`;
