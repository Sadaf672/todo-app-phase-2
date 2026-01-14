import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental Turbopack features if needed
  experimental: {
    // Only enable turbopack in development if needed
    // turbopack: {},
  },

  // Support external packages if needed
  serverExternalPackages: [],
};

export default nextConfig;
