import { Section } from 'components';
import { useState } from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import Arrow from 'public/icons/arrow.svg';

const Faqs = ({ sectionContent }) => {
  const { content, title } = sectionContent;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOnClick = (index) => (e) =>
    index !== selectedIndex ? setSelectedIndex(index) : false;

  return (
    <Section
      id={'faqs'}
      title={title}
      showDescription={false}
      background={true}
      fitContent={true}>
      <FaqsWrapper>
        {content.map((props, index) => {
          const isSelected = selectedIndex === index;

          return (
            <Faq
              key={index}
              {...props}
              isSelected={isSelected}
              onClick={handleOnClick(index)}
            />
          );
        })}
      </FaqsWrapper>
    </Section>
  );
};

const Faq = ({
  title = '',
  description = '',
  isSelected = false,
  onClick = () => {},
}) => (
  <Container>
    <FAQCollapse onClick={onClick}>
      <Text>{title}</Text>
      <ArrowIcon $isSelected={isSelected} />
    </FAQCollapse>
    <Description $isSelected={isSelected}>{description}</Description>
  </Container>
);

const FaqsWrapper = styled.div`
  display: grid;
  flex-direction: column;
  gap: 1rem;
`;

const Container = styled.div`
  border: 1px solid #3e3e3e;
  display: flex;
  flex-direction: column;
  column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
`;

const Description = styled.div(({ $isSelected }) => ({
  padding: '28px 16px 28px 16px;',
  display: $isSelected ? 'block' : 'none',
  borderTop: $isSelected ? '1px solid #3e3e3e' : '0px',
  fontFamily: 'Roboto',
  fontWeight: 300,
  letterSpacing: 0.5,
  lineHeight: '150%',
  minHeight: 150,
}));

const FAQCollapse = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem;
  cursor: pointer;
`;

const Text = styled.div`
  text-align: left;
  vertical-align: top;
  color: #ababab;
  font-weight: 500;
  max-width: 90%;
`;

const ArrowIcon = styled(Arrow)`
  fill: ${colors.white};
  ${({ $isSelected }) => ($isSelected ? 'transform: rotate(90deg);' : '')}
`;

export default Faqs;
