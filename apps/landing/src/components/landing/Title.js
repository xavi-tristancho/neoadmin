import styled from "styled-components";
import { colors } from "styles";
import { responsive } from "utils";
const { mediaQuery } = responsive;

const Title = ({ content = "" }) => (
  <Text dangerouslySetInnerHTML={{ __html: content }} />
);

const Text = styled.h1`
  margin: 0;
  text-align: left;
  vertical-align: top;
  font-size: 38px;
  line-height: 100%;
  color: ${colors.title.title};
  max-width: 465px;

  ${mediaQuery.DESKTOP`
  font-size: 55px;
  `}
`;

export default Title;
