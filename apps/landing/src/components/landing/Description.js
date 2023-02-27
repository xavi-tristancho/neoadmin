import styled from "styled-components";
import { colors } from "styles";
import { responsive } from "utils";
const { mediaQuery } = responsive;

const Description = ({ content = "" }) => {
  var currentDescription = content[Math.floor(Math.random() * content.length)];
  return <Text dangerouslySetInnerHTML={{ __html: currentDescription }} />;
};

const Text = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 18px;
  line-height: 125%;

  margin-bottom: 10px;
  font-family: Roboto;
  color: ${colors.title.description};

  ${mediaQuery.DESKTOP`
    padding-right: 40px;
    font-size: 19px;
  `}

  ${mediaQuery.RETINA`
    padding-right: 120px; 
  `}
`;

export default Description;
