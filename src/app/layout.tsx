"use serve"
import { Poppins } from "next/font/google";
import "@/style/globals.css";
import "@/style/main.css";
import "@/style/extra.css";

import Navbar from "../components/common/Header";
import { MenuItem } from "@/components/interfaces";
import { endpoints } from "@/api/endpoints";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/react"


const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const menuData: MenuItem[] = [
  { label: "Home", url: "/" },
  {
    label: "Ipo",
    url: "/ipo",
    dropdown: true,
    dropdownItems: [
      { label: "Upcoming Ipo", url: "/ipo/upcomingIpo" },
      { label: "Grey Market Ipo", url: "/ipo/greyMarketIpo" },
      { label: "SME Ipo", url: "/ipo/smeMarketIpo" },
      { label: "Subscription Status", url: "/ipo/subscriptionStatus" },
      { label: "Ipo Forms", url: "/ipo/ipoForms" },
      { label: "Ipo BuyBack", url: "/ipo/sharesBuyBack" },
    ],
  },
  {
    label: "Mutual Funds",
    url: "/mutual-funds",
    dropdown: true,
    dropdownItems: [
      { label: "Screener", url: "/mutual-funds/screener" },
    ],
  },
  {
    label: "Calculators",
    url: "/calculators",
    dropdown: true,
    dropdownItems: [
      { label: "Sip Calculator", url: "/calculators/sip_calculator" },
      { label: "Lumpsum Calculator", url: "/calculators/lumpsum_calculator" },
      { label: "Others", url: "/calculators" },
    ],
  },
  {
    label: "Blogs",
    url: "/blogs",
  },
];


const fetchMetadata = async (pathname: any) => {
  try {
    const url = `${endpoints.metaData}?url=${pathname}`;
    const response = await fetch(url, { cache: "no-store" });
    return await response.json();
  } catch (error) {
    console.error("Error fetching MF details", error);
  }
}




export async function generateMetadata() {

  const headersList = headers();
  const pathname = headersList.get("x-url");
  const metaData = await fetchMetadata(pathname ?? "/");

  if (metaData.error) {
    return {
      title: "Not Found",
      description: "Error Page Not Found",
    };
  }

  const metaTitle = metaData.title
    ?? "IpoTech";
  const metaDescription = metaData.description
    ?? "IpoTech";
  const keywords = metaData.keywords
    ?? "IPO, mutual funds, investment, finance, stock market";


  return {
    title: metaTitle,
    description: metaDescription,
    robots: "index, follow",
    author: "IpoTech",
    keywords: keywords,
    copyright: "Copyright 2024 @ IpoTech",
    url: "https://node.onlineinfotech.net",
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      site: "https://node.onlineinfotech.net",
      images: "https://node.onlineinfotech.net/logo.png",
      type: "website",
      url: `https://node.onlineinfotech.net${pathname}`,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: "https://www.gradding.com/logo.png"
    },
    alternates: {
      canonical: `https://node.onlineinfotech.net${pathname}`,
    },
  };
}

const schema = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  "name": "IpoTech",
  "url": "https://node.onlineinfotech.net",
  "description": "IpoTech provides comprehensive information about upcoming IPOs, GMP, buybacks, subscription statuses, and financial tools including calculators for SIP, lumpsum, SWP, and more.",
  "author": {
    "@type": "Organization",
    "name": "IpoTech"
  },
  "datePublished": "2024-07-19",
  "mainEntity": [
    {
      "@type": "WebPage",
      "name": "IPO Details",
      "url": "https://node.onlineinfotech.net/ipo",
      "description": "Find detailed information about upcoming IPOs, including GMP, buyback status, and subscription status."
    },
    {
      "@type": "WebPage",
      "name": "Financial Calculators",
      "url": "https://node.onlineinfotech.net/calculators",
      "description": "Access various financial calculators for SIP, lumpsum investments, SWP, and more."
    },
    {
      "@type": "WebPage",
      "name": "Mutual Fund Screener",
      "url": "https://node.onlineinfotech.net/mutual-funds/screener",
      "description": "Screen and filter mutual funds based on various criteria to make informed investment decisions."
    }
  ],
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <head>
        <meta name="ahrefs-site-verification" content="87106f56afba722eeac5b1e22675225b9b8844cff91992e9fd2b281d1e14deb2" />
        <meta httpEquiv="Content-Language" content="en-us" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="Copyright" content="Copyright 2024 @ IpoTech" />
        <meta name="google-site-verification" content="sD6cDFI9NP_Z3Y6u2w4CLyztd9YGpf4qoxaJTXitlTA" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700&amp;family=Poppins:wght@400;500&amp;display=swap" rel="stylesheet"></link>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      </head>
      <body className={poppins.className}>
        <Navbar menuData={menuData ?? []} />
        <main>
          {children}
        </main>
        <Analytics />

      </body>
    </html>
  );
}

export default RootLayout;


