/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipo.onlineinfotech.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "assets-netstorage.groww.in",
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
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "**",
      },
    ],
  },
  // compiler: {
  //   removeConsole: {
  //     exclude: ["error"],
  //   },
  // },
};

export default nextConfig;
