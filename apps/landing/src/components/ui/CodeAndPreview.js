import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styled from 'styled-components';
import { responsive } from 'utils';
const { mediaQuery } = responsive;

const CodeAndPreview = ({ codeContent = '', src, switchState, setOpen }) => (
  <Container>
    {switchState === 'code' && (
      <SyntaxHighlighterContainer>
        <SyntaxHighlighter
          language="jsx"
          wrapLines={true}
          wrapLongLines={true}
          style={{
            ...vscDarkPlus,
            'pre[class*="language-"]': {
              ...vscDarkPlus['pre[class*="language-"]'],
              margin: 0,
            },
          }}>
          {codeContent}
        </SyntaxHighlighter>
      </SyntaxHighlighterContainer>
    )}
    {switchState === 'preview' && (
      <ScreenshotContainer>
        <Screenshot onClick={() => setOpen(true)} src={src} />
      </ScreenshotContainer>
    )}
  </Container>
);

export default CodeAndPreview;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const ScreenshotContainer = styled.div`
  width: 100%;
  background: #1e1e1e;
  overflow: hidden;
  height: 455px;
  cursor: zoom-in;

  display: flex;
  justify-content: center;

  ${mediaQuery.DESKTOP`
    overscroll-behavior-y: contain;
  `}
`;

const Screenshot = styled.img`
  width: 150%;
  align-self: center;

  ${mediaQuery.TABLET`
  height: 100%;
  `}

  ${mediaQuery.DESKTOP`
  height: 100%;
  width: auto;
  
  & :hover {
    opacity: 0.7;
  }
`}
`;

const SyntaxHighlighterContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1e1e1e;
  max-height: 455px;
  overflow: auto;

  ${mediaQuery.DESKTOP`
    overscroll-behavior-y: contain;
  `}
`;
