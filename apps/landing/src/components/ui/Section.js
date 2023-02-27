import styled from "styled-components";
import { responsive } from "utils";
import { colors } from "styles";

const { getMediaQueryHeader, breakpoints } = responsive;
const { DESKTOP, TABLET } = breakpoints;

const Section = ({
  id = "",
  children,
  title = "",
  description = "",
  descriptionStyle = {},
  containerStyle = {},
  ...props
}) => {
  const {
    showTitleContainer = true,
    showTitle = true,
    showDescription = true,
  } = props;

  return (
    <ContainerWrapper id={id} {...props}>
      <Container style={containerStyle}>
        {showTitleContainer && (
          <TitleContainer {...props}>
            {showTitle && <Title {...props}>{title}</Title>}
            {showDescription && (
              <Description descriptionStyle={descriptionStyle}>
                {description}
              </Description>
            )}
          </TitleContainer>
        )}
        {children}
      </Container>
    </ContainerWrapper>
  );
};

const desktopQuery = getMediaQueryHeader(DESKTOP);
const tabletQuery = getMediaQueryHeader(TABLET);

const ContainerWrapper = styled.div(
  ({ background, fitContent, smallContent }) => ({
    display: "flex",
    backgroundColor: background ? colors.section.background : "transparent",
    minHeight: "100vh",
    justifyContent: "center",
    alignItems: "center",
    ...(fitContent ? { padding: "0 0 15vh 0", minHeight: "auto" } : {}),
    ...(smallContent ? { padding: "15vh 0", minHeight: "50vh" } : {}),

    [desktopQuery]: {
      ...(fitContent ? { padding: "15vh 0", minHeight: "auto" } : {}),
    },
  })
);

const Container = styled.div(() => ({
  width: "1248px",
  padding: "0 1rem",
  [tabletQuery]: {
    padding: "0 2rem",
  },
}));

const TitleContainer = styled.div(({ centered }) => ({
  display: "grid",
  alignItems: centered ? "center" : "left",
  flexDirection: "column",
  gap: "1rem",
  gridGap: "1rem",
  marginBottom: "24px",
  marginTop: "55px",
}));

const Title = styled.div(({ showDescription = true }) => ({
  margin: 0,
  textAlign: "left",
  verticalAlign: "top",
  fontSize: "38px",
  fontWeight: 500,
  lineHeight: "100%",
  color: colors.section.title,
  ...(showDescription ? {} : { marginBottom: "24px" }),

  [desktopQuery]: {
    fontSize: "48px",
    lineHeight: "85%",
  },
}));

const Description = styled.h3(({ descriptionStyle }) => ({
  margin: 0,
  verticalAlign: "top",
  fontSize: "18px",
  fontWeight: 400,
  fontFamily: "Roboto",
  lineHeight: "125%",
  color: colors.section.description.small,

  [desktopQuery]: {
    ...descriptionStyle,
  },
}));

export default Section;
