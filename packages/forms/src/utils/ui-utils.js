import styled from "styled-components";

const generateContainer = (item, DefaultComponent = styled.div``) =>
  item &&
  item.Container &&
  (typeof item.Container === "function" || typeof item.Container === "object")
    ? item.Container
    : DefaultComponent;

export { generateContainer };
