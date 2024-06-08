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
    ],
  },
};

export default nextConfig;
