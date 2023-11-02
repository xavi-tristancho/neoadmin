import styled from "styled-components";
import { responsive } from "utils";
const { mediaQuery } = responsive;

const Logo = ({ developed }) => {
  return (
    <Container>
      <Text>
        {developed}{" "}
        <a
          href="https://www.linkedin.com/in/xavier-tristancho-bordoy/"
          target="_blank"
        >
          Xavi Tristancho Bordoy
        </a>
      </Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.0625rem;
  cursor: pointer;
  order: 3;
  padding: 0 3px 0 8px;
  margin-left: -8px;

  a:hover {
    text-decoration: underline;
  }

  ${mediaQuery.TABLET`
    order: unset;
  `}
`;

const Text = styled.div`
  font-size: 13px;
  color: #ffffff;
`;

export default Logo;
