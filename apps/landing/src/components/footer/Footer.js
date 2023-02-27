import styled from 'styled-components';
import { responsive } from 'utils';
import { NeocoLogo } from 'components';

const { mediaQuery } = responsive;

const Footer = ({ onClickModal, questions, ...props }) => {
  return (
    <Container id="footer">
      <Content>
        <a href={'https://neoco.dev/'} target="_blank">
          <NeocoLogo {...props} />
        </a>
        <Text onClick={onClickModal}>{questions}</Text>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 10px 0;
  transition: top 0.3s;
  z-index: 1;
  align-items: center;
  background: #0c0c0c;

  ${mediaQuery.DESKTOP`
    height: 40px;
  `}
`;

const Content = styled.div`
  display: flex;
  margin: auto;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding: 1.5rem 1rem;
  flex-direction: column;
  align-items: center;
  max-width: 1248px;

  ${mediaQuery.TABLET`
    flex-direction: row;
    justify-content: space-between;
    padding: 1.5rem 2rem;
  `}

  ${mediaQuery.DESKTOP`
    gap: 0;
    padding: 0 2rem;
  `}
`;

const Text = styled.div`
  font-size: 16px;
  color: #aeaeae;
  font-weight: 300;
  cursor: pointer;

  & :hover {
    font-weight: 500;
  }
`;

export default Footer;
