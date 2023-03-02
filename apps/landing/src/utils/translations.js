import { useRouter } from "next/router";
import translations from "languages/translations";

const availableLanguages = [
  { localeCode: "en-US", name: "EN" },
  { localeCode: "es-ES", name: "ES" },
];

const getObjectProps = (path, obj) => {
  return path.split(".").reduce((prev, curr) => {
    return prev ? prev[curr] : "";
  }, obj || self);
};

const getTranslations = ({ translationIndex, language } = {}) => {
  const { locale } = useRouter();
  const currentLanguage = language ? language : locale;

  return translationIndex
    ? getObjectProps(translationIndex, translations[currentLanguage])
    : translations[currentLanguage];
};

const getMetaImage = () => {
  const { locale } = useRouter();
  const urlBase = "https://neoadmin.neoco.dev/";
  const url = locale === "es-US" ? urlBase : `${urlBase}${locale}/`;

  return {
    url,
    image: `/meta-image-${locale}.jpg`,
  };
};

export default { getTranslations, availableLanguages, getMetaImage };
