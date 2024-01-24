/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "akmweb.youngjoygame.com",
      },
      {
        protocol: "https",
        hostname: "akmwebstatic.yuanzhanapp.com",
      },
      {
        protocol: "https",
        hostname: "indoch.s3.ml.moonlian.com",
      },
    ],
  },
};

export default nextConfig;
