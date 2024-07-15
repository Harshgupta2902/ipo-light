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
import { usePathname } from "next/navigation";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});


interface Metadata {
  title: string;
  description: string;
  keywords: string[];
  author: string;
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
  const [metadata, setMetadata] = useState<Metadata | null>(null);
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
        <title>{metadata ? metadata.title : "IpoTech"}</title>
        <meta name="description" content={metadata ? metadata.description : "IpoTech"} />
        <meta name="keywords" content={metadata ? metadata.keywords.join(', ') : "IpoTech"} />
        <meta name="author" content={metadata ? metadata.author : "John Doe"} />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700&amp;family=Poppins:wght@400;500&amp;display=swap" rel="stylesheet"></link>
      </head>
      <body className={poppins.className}>
        <Header menuData={menuData ?? []} />
        {children}
      </body>
    </html>
  );
}
