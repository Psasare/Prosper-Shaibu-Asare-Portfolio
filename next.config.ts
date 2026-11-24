import type { NextConfig } from "next";

// Next.js configuration - updated for dev cache refresh
const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "172.20.4.15",
    "172.20.4.15:3000",
    "localhost:3000",
  ],
  experimental: {
    cpus: 1,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "www.vectorlogo.zone",
      },
    ],
  },
};

export default nextConfig;
