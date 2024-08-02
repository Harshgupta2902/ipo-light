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
  // experimental: {
  //   middleware: true,
  // },
};

export default nextConfig;
