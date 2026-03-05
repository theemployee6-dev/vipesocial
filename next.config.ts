import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  /* config options here */
  allowedDevOrigins: ["localhost:3000", "192.168.15.200"],
  experimental: {
    webpackBuildWorker: false, // 👈 Desativa o build worker
  },
};

export default nextConfig;
