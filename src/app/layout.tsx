"use client"

import { Poppins } from "next/font/google";
import "./globals.css";
import "../style/main.css";
import "../style/extra.css";
import { useEffect, useState } from "react";

import Header from "../components/common/Header";
import { MenuItem } from "@/components/interfaces";
import { get } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { usePathname, useRouter } from "next/navigation";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});



export interface MetaData {
  title: string
  description: string
  keywords: string[]
  canonical: string
  og: Og
  twitter: Twitter
  additionalMetaTags: AdditionalMetaTag[]
}

export interface Og {
  title: string
  description: string
  url: string
  type: string
  image: string
}

export interface Twitter {
  card: string
  title: string
  description: string
  image: string
}

export interface AdditionalMetaTag {
  name: string
  content: string
}



const menuData: MenuItem[] = [
  { label: "Home", url: "/" },
  {
    label: "Ipo",
    url: "",
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
    label: "Calculators",
    url: "",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [metadata, setMetadata] = useState<MetaData | null>(null);
  console.log(pathname);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const metaData = await get(endpoints.metaData + "?url=" + pathname);
        setMetadata(metaData);
        console.log(`metaData ${metaData.title}`);
      } catch (error) {
        console.error("Failed to fetch metadata", error);
      }
    };

    fetchMetadata();
  }, []);

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700&amp;family=Poppins:wght@400;500&amp;display=swap" rel="stylesheet"></link>
        {metadata && (
          <>
            {metadata.title && <title>{metadata.title}</title>}
            {metadata.description && <meta name="description" content={metadata.description} />}
            {metadata.keywords && metadata.keywords.length > 0 && <meta name="keywords" content={metadata.keywords.join(", ")} />}
            {metadata.canonical && <link rel="canonical" href={`https://node.onlineinfotech.net${metadata.canonical}`} />}
            {metadata.og.title && <meta property="og:title" content={metadata.og.title} />}
            {metadata.og.description && <meta property="og:description" content={metadata.og.description} />}
            {metadata.og.url && <meta property="og:url" content={`https://node.onlineinfotech.net${metadata.og.url}`} />}
            {metadata.og.type && <meta property="og:type" content={metadata.og.type} />}
            {metadata.og.image && <meta property="og:image" content={metadata.og.image} />}
            {metadata.twitter.card && <meta name="twitter:card" content={metadata.twitter.card} />}
            {metadata.twitter.title && <meta name="twitter:title" content={metadata.twitter.title} />}
            {metadata.twitter.description && <meta name="twitter:description" content={metadata.twitter.description} />}
            {metadata.twitter.image && <meta name="twitter:image" content={metadata.twitter.image} />}
            {metadata.additionalMetaTags && metadata.additionalMetaTags.map((tag, index) => (
              tag.name && tag.content && <meta key={index} name={tag.name} content={tag.content} />
            ))}
          </>

        )}
      </head>
      <body className={poppins.className}>
        <Header menuData={menuData ?? []} />
        {children}
      </body>
    </html>
  );
}
