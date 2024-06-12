// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     // domains: ['ipo.onlineinfotech.net'], // Add your domain here

//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "ipo.onlineinfotech.net",
//         pathname: "**",
//       },
//       {
//         protocol: "https",
//         hostname: "assets.tickertape.in",
//         pathname: "**",
//       },
//       {
//         protocol: "https",
//         hostname: "placehold.co",
//         pathname: "**",
//       },
//     ],
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ipo.onlineinfotech.net', 'assets.tickertape.in', 'placehold.co'], // Add your domains here

    // Global headers for all remote patterns
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    path: '/_next/image',
    loader: 'default',
    server: 'vercel',

    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tickertape.in",
        pathname: "**",
      },
    ],
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable', // Cache for 1 year
      },
    ],
  },
};

export default nextConfig;
