// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "neoAdmin",
  tagline: "",
  url: "https://libraries-docs.vercel.app",
  baseUrl: "/docs/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  organizationName: "app-artisans",
  projectName: "neoAdmin",
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          // Please change this to your repo.
          /*editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',*/
        },
        /*blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },*/
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // ... Your options.
        hashed: true,
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "neoAdmin",
        hideOnScroll: true,
        /*items: [
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],*/
      },
      footer: {
        links: [
          {
            //3 columns recomended
            title: "Community",
            items: [
              {
                label: "Linkedin",
                href: "https://www.linkedin.com/in/xavier-tristancho-bordoy/",
              },
              {
                label: "Discord",
                href: "https://discord.gg/knHcajSnGg",
              },
              {
                label: "Youtube",
                href: "https://www.youtube.com/@xavi_tristancho",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/xavitristancho",
              },
            ],
          },
        ],
        copyright: `Xavi Tristancho Bordoy © ${new Date().getFullYear()}`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
    }),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    localeConfigs: {
      en: {
        label: "English",
        htmlLang: "en-US",
      },
      es: {
        label: "Español",
        htmlLang: "es-ES",
      },
    },
  },
};

module.exports = config;
