import { useRouter } from 'next/router';

const isEsLang = () => {
  const { locale } = useRouter();
  return locale === 'es-ES' ? `/${locale}` : '';
};

const getNeocoUrl = ({ page } = {}) => {
  const urlLang = isEsLang();

  if (page === 'legal') return `https://www.neoco.dev${urlLang}/legal`;

  return `https://www.neoco.dev${urlLang}/terms`;
};

export default getNeocoUrl;
