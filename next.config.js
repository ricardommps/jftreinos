module.exports = {
  trailingSlash: true,
  transpilePackages: ["react-leaflet-cluster"],
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }
    config.resolve.alias.canvas = false;
    return config;
  },
};
