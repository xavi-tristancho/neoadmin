import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { translations } from "utils";
const { availableLanguages } = translations;

const Languages = ({}) => {
  const { locale, asPath } = useRouter();

  return (
    <Container>
      {availableLanguages.map(({ localeCode, name }, index) => (
        <>
          {index !== 0 && <Separator>/</Separator>}
          <Link href={asPath} locale={localeCode} key={name} scroll={false}>
            <Language $isSelected={localeCode === locale}>{name}</Language>
          </Link>
        </>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
`;

const Separator = styled.div`
  font-size: 16px;
  color: #bfbebe;
  cursor: context-menu;
`;

const Language = styled(Separator)`
  font-weight: ${({ $isSelected }) => ($isSelected ? "500" : "300")};
  cursor: pointer;

  & :hover {
    font-weight: 500;
  }
`;

export default Languages;
