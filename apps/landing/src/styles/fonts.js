/* Text size styles */
/* base size: 16px */
const baseRemSize = 16;

const getRem = (size) => `${size / baseRemSize}rem`;

const giant = 64;
const big = 48;
const medium = 64;
const defaultSize = 16;
const half = 8;
const quarter = 4;

const defaultSpacing = "0.08rem";

export default {
  sizes: {
    landing: {
      desktop: {
        title: getRem(giant),
        description: getRem(defaultSize),
        cta: getRem(defaultSize),
      },
      mobile: {
        title: getRem(giant),
        description: getRem(defaultSize),
        cta: getRem(defaultSize),
      },
    },
    section: {
      desktop: {
        title: getRem(big),
        description: getRem(defaultSize),
      },
      mobile: {
        title: getRem(big),
        description: getRem(defaultSize),
      },
    },
    feature: {
      desktop: {
        title: getRem(giant),
        description: getRem(defaultSize),
      },
      mobile: {
        title: getRem(giant),
        description: getRem(defaultSize),
      },
    },
    card: {
      title: "0.25rem",
      description: "0.22rem",
    },
  },
  spacing: {
    defaultSpacing,
  },
  families: {
    roboto: "Roboto, Helvetica, sans-serif",
    silka: "Silka, Helvetica, sans-serif",
  },
};
