import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "../style/main.css";
import "../style/extra.css";

import Header from "../components/common/Header";
import { MenuItem } from "@/components/interfaces";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IpoTech",
  description: "Next Gen Fintech Platform For Ipo, Mutual-Funds, Stocks, and all othert Tools",
};



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
  // {
  //   label: "Blogs",
  //   url: "/blogs",
  // },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700&amp;family=Poppins:wght@400;500&amp;display=swap" rel="stylesheet"></link>
      </head>
      <body className={poppins.className}>
        <Header menuData={menuData ?? []} />
        {children}
      </body>
    </html>
  );
}
