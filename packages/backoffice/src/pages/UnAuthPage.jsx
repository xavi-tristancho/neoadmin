import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
  }
`;

const UnAuthPage = ({ children }) => {
  return (
    <Container>
      <GlobalStyle />
      <Box>{children}</Box>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const Box = styled.div`
  width: 100vw;
`;

export default UnAuthPage;
