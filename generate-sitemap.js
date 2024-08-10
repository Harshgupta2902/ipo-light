const fs = require("fs");
const path = require("path");

async function fetchLinks(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function generateSitemap() {
  const currentDate = new Date().toISOString();
  const amc = [
    "Bajaj Finserv Mutual Fund",
    "Helios Mutual Fund",
    "WhiteOak Capital Mutual Fund",
    "ITI Mutual Fund",
    "TRUST Mutual Fund",
    "NJ Mutual Fund",
    "Samco Mutual Fund",
    "Mahindra Manulife Mutual Fund",
    "Canara Robeco Mutual Fund",
    "Quant Mutual Fund",
    "ICICI Prudential Mutual Fund",
    "JM Financial Mutual Fund",
    "LIC Mutual Fund",
    "Franklin Templeton Mutual Fund",
    "Aditya Birla Sun Life Mutual Fund",
    "Mirae Asset Mutual Fund",
    "Bank of India Mutual Fund",
    "Motilal Oswal Mutual Fund",
    "PGIM India Mutual Fund",
    "360 ONE Mutual Fund",
    "Nippon India Mutual Fund",
    "Union Mutual Fund",
    "Bandhan Mutual Fund",
    "Navi Mutual Fund",
    "SBI Mutual Fund",
    "DSP Mutual Fund",
    "Tata Mutual Fund",
    "Edelweiss Mutual Fund",
    "Invesco Mutual Fund",
    "Sundaram Mutual Fund",
    "HDFC Mutual Fund",
    "HSBC Mutual Fund",
    "PPFAS Mutual Fund",
    "Baroda BNP Paribas Mutual Fund",
    "Quantum Mutual Fund",
    "Taurus Mutual Fund",
    "Shriram Mutual Fund",
    "Groww Mutual Fund",
    "Kotak Mahindra Mutual Fund",
    "Zerodha Mutual Fund",
    "Axis Mutual Fund",
    "UTI Mutual Fund",
  ];
  const category = [
    "best-low-duration-mutual-funds",
    "best-medium-duration-mutual-funds",
    "best-dynamic-mutual-funds",
    "best-gilt-mutual-funds",
    "best-credit-risk-mutual-funds",
    "best-liquid-mutual-funds",
    "best-ultra-short-mutual-funds",
    "best-aggressive-mutual-funds",
    "best-conservative-mutual-funds",
    "best-arbitrage-mutual-funds",
    "best-multi-cap-mutual-funds",
    "best-large-cap-mutual-funds",
    "best-mid-cap-mutual-funds",
    "best-small-cap-mutual-funds",
    "best-elss-mutual-funds",
    "best-dividend-yield-mutual-funds",
    "best-sector-mutual-funds",
    "best-contra-mutual-funds",
    "best-value-mutual-funds",
  ];

  const links1 = await fetchLinks(
    "https://apis-iota-five.vercel.app/api/getIpoLinks"
  );
  const sitemap1 = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${links1
      .map(
        (link) => `
      <url>
        <loc>https://www.ipotec.in/ipo/details/${link}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>0.80</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  // const links2 = await fetchLinks(
  //   "https://apis-iota-five.vercel.app/api/getMfLinks"
  // );
  // const sitemap2 = `<?xml version="1.0" encoding="UTF-8"?>
  // <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  //   ${links2
  //     .map(
  //       (link) => `
  //     <url>
  //       <loc>https://www.ipotec.in/mutualfunds/details/${link}</loc>
  //       <lastmod>${currentDate}</lastmod>
  //       <priority>0.80</priority>
  //     </url>
  //   `
  //     )
  //     .join("")}
  // </urlset>`;

  const sitemap3 = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${amc
      .map(
        (link) => `
      <url>
        <loc>https://www.ipotec.in/mutualfunds/amc/${link
          .toLowerCase()
          .replaceAll(" ", "-")}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>0.80</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  const sitemap4 = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${category
      .map(
        (link) => `
      <url>
        <loc>https://www.ipotec.in/mutualfunds/category/${link}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>0.80</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  const publicDir = path.join(__dirname, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, "ipo-details.xml"), sitemap1);
  // fs.writeFileSync(path.join(publicDir, "mutualfunds-details.xml"), sitemap2);
  fs.writeFileSync(path.join(publicDir, "amc.xml"), sitemap3);
  fs.writeFileSync(path.join(publicDir, "category.xml"), sitemap4);
  console.log(
    "Sitemaps generated at public/ipo-details.xml and public/mutualfunds-details.xml and public/amc.xml and category.xml "
  );
}

generateSitemap().catch(console.error);
