import { useRouter } from "next/router";

const isEsLang = () => {
  const { locale } = useRouter();
  return locale === "es-ES" ? `/${locale}` : "";
};

const getLegalUrl = ({ page } = {}) => {
  const urlLang = isEsLang();

  if (page === "legal") return `https://www.xavitristancho.pro${urlLang}/legal`;

  return `https://www.xavitristancho.pro${urlLang}/terms`;
};

export default getLegalUrl;
