import styled from "styled-components";
import { responsive } from "utils";
const { mediaQuery } = responsive;

const CoomingSoon = () => {
  return (
    <Container>
      <ProductName>neoAdmin</ProductName>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
`;

const CoomingSoonContainer = styled.div`
  border-radius: 0.0625rem;
  padding: 0.4rem;
  background-color: #8b8b8b;

  ${mediaQuery.DESKTOP`
  padding: 0.5rem;
  `}
`;

const ProductName = styled.div`
  font-size: 18px;
  color: #ffffff;
  margin-right: 1rem;

  ${mediaQuery.DESKTOP`
  font-size: 24px;
  `};
`;

const Text = styled.div`
  font-size: 10px;
  color: #1c1c1c;
  font-weight: 800;
  text-transform: uppercase;

  ${mediaQuery.DESKTOP`
  font-size: 12px;
  `}
`;

export default CoomingSoon;
