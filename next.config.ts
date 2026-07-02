import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    remotePatterns: [],
  },
  compress: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
  },
  turbopack: {},
  webpack: (config, { dev, isServer }) => {
    // Only strip polyfills for client-side production builds
    if (!dev && !isServer) {
      config.resolve.alias["next/dist/build/polyfills/polyfill-nomodule"] = false;
      
      // Override entries to remove next/dist/build/polyfills/polyfill-module
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        if (entries["main-app"] && Array.isArray(entries["main-app"])) {
          entries["main-app"] = entries["main-app"].filter(
            (file: string) => !file.includes("polyfills/polyfill")
          );
        }
        return entries;
      };
    }
    return config;
  },
};

export default nextConfig;
