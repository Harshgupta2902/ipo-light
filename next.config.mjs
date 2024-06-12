/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['ipo.onlineinfotech.net'], // Add your domain here

    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipo.onlineinfotech.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "assets.tickertape.in",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

