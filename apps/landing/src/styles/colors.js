const colors = {
  "yellow light": "#FDFFA1",
  "neoco yellow": "#FCFF51",
  yellow: "#FBFF33",
  white: "#FFFFFF",
  "light gray": "#F0EFEF",
  "neoco gray": "#BFBEBE",
  "third gray": "#AEAEAE",
  "second gray": "#646464",
  gray: "#9E9E9E",
  "third dark gray": "#616161",
  "dark gray": "#383838",
  "soft black": "#191919",
  "neoco black": "#1C1C1C",
  "gradient dark black": "#0c0c0c",
  "gradient light black": "#1e1e1e",
};

export default {
  comingSoon: { background: colors.white, title: colors["neoco black"] },
  cta: {
    background: colors["neoco yellow"],
    title: colors["neoco black"],
  },
  section: {
    background: colors["gradient dark black"],
    title: colors.white,
    stroke: colors["neoco gray"],
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
  navbar: { background: colors["neoco black"], stroke: colors["neoco yellow"] },
  footer: { background: colors["soft black"] },
  white: colors.white,
};
