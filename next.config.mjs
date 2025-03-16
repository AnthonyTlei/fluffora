import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  images: {
    remotePatterns: [
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
});

export default nextConfig;
