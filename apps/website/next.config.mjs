/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@packages/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com"
      }
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30
  }
};

export default nextConfig;
