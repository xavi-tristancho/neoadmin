module.exports = {
  trailingSlash: true,
  i18n: {
    locales: ["en-US", "es-ES"],
    defaultLocale: "en-US",
  },
  rewrites: () => [
    {
      source: "/docs/:match*",
      destination: "https://neoadmin-docs.vercel.app/:match*",
    },
    {
      source: "/neoadmin-demo/:match*",
      destination: "https://neoadmin-demo.vercel.app/:match*",
    },
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, path: false };
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};
