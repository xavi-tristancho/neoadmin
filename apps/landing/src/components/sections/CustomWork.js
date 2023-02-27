import { CTA, Section } from 'components';
import styled from 'styled-components';
import { colors } from 'styles';
import { responsive } from 'utils';
const { mediaQuery } = responsive;

const CustomWork = ({
  sectionContent: { title = '', description = '', content = [] },
  contactUs,
  onClickModal,
}) => (
  <Section id={'custom-work'} showTitleContainer={false} smallContent={true}>
    <Container>
      <InnerContainer>
        <Title>{title}</Title>
        <Content dangerouslySetInnerHTML={{ __html: description }} />
        <CTA content={contactUs} onClick={onClickModal} styleType={'custom'} id="customcontactus" />
      </InnerContainer>
    </Container>
  </Section>
);

export default CustomWork;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  ${mediaQuery.TABLET`  
    max-width: 55%;
  `}

  ${mediaQuery.DESKTOP`  
    max-width: 40%;
  `}
`;

const Content = styled.div`
  & > ul > li {
    margin: 10px 0;
  }
`;

const Title = styled.div`
  margin: 0;
  text-align: left;
  vertical-align: top;
  font-size: 38px;
  font-weight: 500;
  line-height: 100%;
  color: ${colors.section.title};
  hyphens: auto;

  ${mediaQuery.DESKTOP`
    font-size: 48px;
  `}
`;
