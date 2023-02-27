import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styled from "styled-components";
import SplitIcon from "public/split.svg";

const Splitter = ({ codeContent = "", switchState }) => {
  return (
    <Container>
      <Split>
        <SplitBar />
        <IconContainer>
          <SplitIcon />
        </IconContainer>
      </Split>

      <SyntaxHighlighterContainer>
        <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
          {codeContent}
        </SyntaxHighlighter>
      </SyntaxHighlighterContainer>
      <Screenshot src="command.png" />
    </Container>
  );
};

export default Splitter;

const Split = styled.div`
  position: absolute;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
  left: 50%;
  transform: translate(-50%, 0);
`;

const IconContainer = styled.div`
  z-index: 1;
  cursor: grab;
`;

const SplitBar = styled.div`
  width: 4px;
  background-color: white;
  height: 100%;
  position: absolute;
  left: 45%;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Screenshot = styled.img`
  position: absolute;
  width: 100%;
`;

const SyntaxHighlighterContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #1e1e1e;
  overflow: auto;
`;
