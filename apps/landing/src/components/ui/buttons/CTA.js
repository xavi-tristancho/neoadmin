import styled from 'styled-components';
import Arrow from 'public/icons/arrow.svg';
import { colors } from 'styles';
import { responsive } from 'utils';
const { mediaQuery, getMediaQueryHeader, breakpoints } = responsive;

const CTA = ({
  content = '',
  variant = 'small',
  styleType = 'default',
  ...props
}) => {
  return (
    <Container styleType={styleType} variant={variant} {...props}>
      <ContentWrapper>
        <Text>{content}</Text>
        <Arrow style={{ fill: colors.cta.title }} />
      </ContentWrapper>
    </Container>
  );
};

const variants = { nav: 0.3, small: 0.5, big: 1 };
const tabletQuery = getMediaQueryHeader(breakpoints.TABLET);

const styleTypes = {
  default: `
  background: ${colors.cta.background};
  border-radius: 0.1875rem;
  
  &:hover {
    background: #fbff00;
  }
  `,
  custom: `
  background: #feff9e;
  border-radius: 0;
  margin-left: auto;
  
  &:hover {
    background: #fcff51;
  }
  `,
};

const Container = styled.div`
  padding: 0.8rem;

  ${({ variant, styleType }) => {
    const styles = styleTypes[styleType];
    const padding = variants[variant];
    const isSmallOrNav = variant === 'small' || variant === 'nav';
    const paddingLeft = isSmallOrNav ? 'padding-left: 0.6rem; ' : '';

    return `
      ${tabletQuery} {
        padding: ${padding}rem;
        ${paddingLeft} 
      }
      ${styles}`;
  }}

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.625rem;

  cursor: pointer;
  width: fit-content;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
`;

const Text = styled.div`
  text-align: left;
  vertical-align: top;
  font-weight: 700;
  color: ${colors.cta.title};
  font-size: 13px;

  ${mediaQuery.DESKTOP`font-size: 16px;`}
`;

export default CTA;
