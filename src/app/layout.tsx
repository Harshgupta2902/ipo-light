import { Poppins } from "next/font/google";
import "@/style/globals.css";
import "@/style/main.css";
import "@/style/extra.css";

import Navbar from "../components/common/Header";
import { MenuItem } from "@/components/interfaces";
import { endpoints } from "@/api/endpoints";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/react"
import dynamic from 'next/dynamic';
import Script from "next/script";

const Footer = dynamic(() => import("@/app/Footer"));


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
    url: "/mutualfunds",
    dropdown: true,
    dropdownItems: [
      { label: "Screener", url: "/mutualfunds/screener" },
      { label: "AMC", url: "/mutualfunds/amc" },
      { label: "Categories", url: "/mutualfunds/category", },
      { label: "NFO", url: "/mutualfunds/nfo", },

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
  // {
  //   label: "Tools",
  //   url: "",
  //   dropdown: true,
  //   dropdownItems: [
  //     { label: "IFSC Finder", url: "/ifsc-code" },
  //     { label: "PinCode Finder", url: "/pincode-finder" },
  //   ],
  // },
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


const mainSchema = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  "name": "IpoTec",
  "url": "https://www.ipotec.in/",
  "description": "IpoTec provides comprehensive information about upcoming IPOs, GMP, buybacks, subscription statuses, and financial tools including calculators for SIP, lumpsum, SWP, and more.",
  "author": {
    "@type": "Organization",
    "name": "IpoTec"
  },
  "datePublished": "2024-07-19",
  "mainEntity": [
    {
      "@type": "WebPage",
      "name": "IPO Details",
      "url": "https://www.ipotec.in/ipo",
      "description": "Find detailed information about upcoming IPOs, including GMP, buyback status, and subscription status."
    },
    {
      "@type": "WebPage",
      "name": "Financial Calculators",
      "url": "https://www.ipotec.in/calculators",
      "description": "Access various financial calculators for SIP, lumpsum investments, SWP, and more."
    },
    {
      "@type": "WebPage",
      "name": "Mutual Fund Screener",
      "url": "https://www.ipotec.in/mutualfunds/screener",
      "description": "Screen and filter mutual funds based on various criteria to make informed investment decisions."
    }
  ],
};
// const boldMap: { [key: string]: string } = {
//   A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜', J: '𝗝',
//   K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧',
//   U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭', a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱',
//   e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻',
//   o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅',
//   y: '𝘆', z: '𝘇', 0: '𝟬', 1: '𝟭', 2: '𝟮', 3: '𝟯', 4: '𝟰', 5: '𝟱', 6: '𝟲', 7: '𝟳', 8: '𝟴', 9: '𝟵',
// };

// const toBoldUnicode = (str: string) => {
//   return str.split('').map(char => boldMap[char] || char).join('');
// };



export async function generateMetadata() {
  const headersList = headers();
  const pathname = headersList.get("x-url");
  const metaData = await fetchMetadata(pathname ?? "/");

  if (metaData.error || !metaData) {
    return {
      title: "Not Found",
      description: "Error Page Not Found",
    };
  }

  const metaTitle = metaData.title
    ?? "IpoTec";
  const metaDescription = metaData.description
    ?? "IpoTec";
  const keywords = metaData.keywords
    ?? "IPO, mutual funds, investment, finance, stock market";


  return {
    title: metaTitle,
    // title: toBoldUnicode(metaTitle),
    description: metaDescription,
    robots: "index, follow",
    author: "IpoTec",
    keywords: keywords,
    copyright: "Copyright 2024 @ IpoTec",
    url: "https://www.ipotec.in/",
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      site: "https://www.ipotec.in/",
      images: "https://www.ipotec.in/og_image.png",
      type: "website",
      url: `https://www.ipotec.in${pathname}`,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: "https://www.ipotec.in/og_image.png"
    },
    alternates: {
      canonical: `https://www.ipotec.in${pathname}`,
    },
  };
}


const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {

  const headersList = headers();
  const pathname = headersList.get("x-url");
  console.log(pathname, "layout ");


  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3578725480736580" crossOrigin="anonymous"></script>
        <meta name="google-site-verification" content="qfvtOvETSlOGGfLBvcE6Yk2Fqj0HmCGkmObv5r3MCnc" />
        <meta name="ahrefs-site-verification" content="c9bc1dfb881082e1aca65a8f84eb9243001c319904258b4f601717781f2339b3" />
        <meta name="msvalidate.01" content="E31009FF5E0FF8B37698B8D4B526016D" />
        <meta httpEquiv="Content-Language" content="en-us" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="Copyright" content="Copyright 2024 @ IpoTec" />
        <link rel="apple-touch-icon" sizes="180x180" href="/layout/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/layout/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/layout/favicon-16x16.png" />
        <link rel="icon" href="/layout/favicon.ico" type="image/x-icon" sizes="16x16" />
        <link rel="manifest" href="/site.webmanifest"></link>
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700&amp;family=Poppins:wght@400;500&amp;display=swap" rel="stylesheet"></link>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mainSchema) }} />
      </head>
      <body className={`${poppins.className} bg-white`}>
        <Navbar menuData={menuData ?? []} />
        <main>
          {children}
        </main>
        <Analytics />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-9V7F339R8D" async />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9V7F339R8D');
            `,
          }}
        />
        {pathname?.includes("ifsc-code") === true ? null : <Footer />}
      </body>
    </html>
  );
}

export default RootLayout;


