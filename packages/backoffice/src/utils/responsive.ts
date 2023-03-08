import { useState, useEffect } from "react";

const breakpoints: { [key: string]: number } = {
  MOBILE: 576,
  TABLET: 768,
  DESKTOP: 992,
  RETINA: 1200,
  RETINAM: 1400,
  RETINAL: 1600,
};

type MediaQueryFn = (
  str: TemplateStringsArray,
  ...values: string[]
) => string;

export const mediaQuery: { [key: string]: MediaQueryFn } = {
  MOBILE: (str, ...values) =>
    getMediaQuery(breakpoints.MOBILE, joinInterpolations(str, values)),
  TABLET: (str, ...values) =>
    getMediaQuery(breakpoints.TABLET, joinInterpolations(str, values)),
  DESKTOP: (str, ...values) =>
    getMediaQuery(breakpoints.DESKTOP, joinInterpolations(str, values)),
  RETINA: (str, ...values) =>
    getMediaQuery(breakpoints.RETINA, joinInterpolations(str, values)),
  RETINAM: (str, ...values) =>
    getMediaQuery(breakpoints.RETINAM, joinInterpolations(str, values)),
  RETINAL: (str, ...values) =>
    getMediaQuery(breakpoints.RETINAL, joinInterpolations(str, values)),
};

const joinInterpolations = (
  strings: TemplateStringsArray,
  values: string[]
): string =>
  strings
    .map((str, index) =>
      typeof values[index] !== "undefined" ? `${str}${values[index]}` : str
    )
    .join("");

const getMediaQuery = (breakpoint: number, styles: string): string =>
  `@media ${getWidth(breakpoint)} { ${styles} }`;

const getWidth = (breakpoint: number) => `(min-width: ${breakpoint}px)`;

const useMediaQuery = (query: number) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(getWidth(query));
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener("resize", listener);
      return () => window.removeEventListener("resize", listener);
    }
  }, [matches, getWidth(query)]);

  return matches;
};

export default { breakpoints, mediaQuery, useMediaQuery };
