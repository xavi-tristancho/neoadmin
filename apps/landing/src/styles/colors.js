const colors = {
  "yellow light": "#FDFFA1",
  "brand yellow": "#FCFF51",
  yellow: "#FBFF33",
  white: "#FFFFFF",
  "light gray": "#F0EFEF",
  "brand gray": "#BFBEBE",
  "third gray": "#AEAEAE",
  "second gray": "#646464",
  gray: "#9E9E9E",
  "third dark gray": "#616161",
  "dark gray": "#383838",
  "soft black": "#191919",
  "brand black": "#1C1C1C",
  "gradient dark black": "#0c0c0c",
  "gradient light black": "#1e1e1e",
};

export default {
  cta: {
    background: colors["brand yellow"],
    title: colors["brand black"],
  },
  section: {
    background: colors["gradient dark black"],
    title: colors.white,
    stroke: colors["brand gray"],
    description: { small: colors["third gray"], big: colors.gray },
  },
  title: {
    background: colors["third dark gray"],
    title: colors.white,
    description: colors["third gray"],
  },
  feature: {
    background: colors["third dark gray"],
    title: colors["light gray"],
    description: colors["second gray"],
  },
  solutions: {
    title: colors["second gray"],
    description: colors["light gray"],
  },
  card: {
    background: colors["dark gray"],
    title: colors.white,
    description: colors["yellow light"],
    stroke: colors.yellow,
    hover: colors["third dark gray"],
  },
  navbar: { background: colors["brand black"], stroke: colors["brand yellow"] },
  footer: { background: colors["soft black"] },
  white: colors.white,
};
