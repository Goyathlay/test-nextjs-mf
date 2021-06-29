const {withFederatedSidecar, federationLoader} = require("@module-federation/nextjs-mf");

module.exports = withFederatedSidecar({
  name: "componentKit",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./title": "./components/title.js",
  },
  shared: {
    react: {
      requiredVersion: false,
      singleton: true,
    },
  },
})({
  future: {
    webpack5: true,
  },
  webpack(config, options) {
    const { webpack } = options;
    config.experiments = { topLevelAwait: true };
    config.module.rules.push({
      test: /_app.js/,
      loader: federationLoader,
    });
    config.plugins.push(
      new webpack.container.ModuleFederationPlugin({
        shared: {
          react: {
            eager: true,
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );

    return config;
  },
});
