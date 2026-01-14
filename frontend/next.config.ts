import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Next 16 correct replacement
  serverExternalPackages: [],

  // ✅ Required to avoid Turbopack vs Webpack error
  turbopack: {},
};

export default nextConfig;
