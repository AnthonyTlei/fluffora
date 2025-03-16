/** @type {import('next').NextConfig} */

import { hostname } from "os";

const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      {
        hostname: "tleiji-fluff-battles-bucket.s3.eu-central-1.amazonaws.com",
      },
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
};

export default nextConfig;
