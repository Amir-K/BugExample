import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: true,
  webpack(config, { isServer }) {
    if (isServer) {
      config.devtool = "source-map"; // Generates source maps for server code
    }
    return config;
  },
};

export default nextConfig;
