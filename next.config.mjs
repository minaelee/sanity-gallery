/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["cdn.sanity.io", "via.placeholder.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  experimental: {
    taint: true,
  },
};

export default nextConfig;
