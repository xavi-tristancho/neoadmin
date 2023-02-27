import styled from 'styled-components';
import NeocoLogoSvg from 'public/icons/neoco_logo_small.svg';
import { responsive } from 'utils';
const { mediaQuery } = responsive;

const NeocoLogo = ({ developed }) => {
  return (
    <Container>
      <Text>{developed}</Text>
      <NeocoLogoIcon />
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

  & :hover {
    background: white;
  }

  & :hover > * {
    color: #0c0c0c;
    font-weight: 600;
    fill: #0c0c0c;
  }

  ${mediaQuery.TABLET`
    order: unset;
  `}
`;

const Text = styled.div`
  font-size: 13px;
  color: #ffffff;
`;

const NeocoLogoIcon = styled(NeocoLogoSvg)`
  fill: #ffffff;
`;

export default NeocoLogo;
