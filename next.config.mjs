/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["cdn.sanity.io", "via.placeholder.com"], // use remotePatterns instead of domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
  experimental: {
    taint: true,
  },
};

export default nextConfig;
