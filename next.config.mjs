/** @type {import('next').NextConfig} */

import { hostname } from "os";

const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }],
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
};

export default nextConfig;
