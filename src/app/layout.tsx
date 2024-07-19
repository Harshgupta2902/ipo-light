import { Poppins } from "next/font/google";
import "./globals.css";
import "../style/main.css";
import "../style/extra.css";

import Navbar from "../components/common/Header";
import { MenuItem } from "@/components/interfaces";
import { endpoints } from "@/api/endpoints";
import { headers } from "next/headers";
import MetaView from "./meta-tags";
import { Analytics } from "@vercel/analytics/react"


const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});



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



const fetchMetadata = async (pathname: string) => {
  try {
    const response = await fetch(`${endpoints.metaData}?url=${pathname}`);
    if (!response.ok) {
      throw new Error('Meta not found');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching MF details", error);
    throw error;
  }
}


const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {

  const headersList = headers();
  const domain = headersList.get('host') || "";
  const fullUrl = headersList.get('referer') || "";
  let pathname = (fullUrl.match(new RegExp(`https?:\/\/${domain}(.*)`)) || [])[1];

  if (!pathname) {
    pathname = "/";
  }

  let metadata = null;

  try {

    if (pathname) {
      console.log(`pathname::::::::::::::::::::${pathname}`);

      metadata = await fetchMetadata(pathname);
      console.log(`meta Data Successfully fetched for ${pathname}`);
    }

  } catch (err) {
    console.error(`error ${err}`);

  }

  return (
    <html lang="en">
      <MetaView metaData={metadata} />
      <body className={poppins.className}>
        <Navbar menuData={menuData ?? []} />
        {children}
        <Analytics />

      </body>
    </html>
  );
}

export default RootLayout;


