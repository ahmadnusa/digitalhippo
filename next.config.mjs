/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "digitalhippo-liart.up.railway.app",
      },
    ],
  },
};

export default nextConfig;
