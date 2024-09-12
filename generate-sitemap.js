const fs = require("fs");
const path = require("path");

async function fetchLinks(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function generateSitemapFile(fileName, sitemapContent) {
  const publicDir = path.join(__dirname, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  fs.writeFileSync(path.join(publicDir, fileName), sitemapContent);
}

async function generateMainSitemap() {
  const currentDate = new Date().toISOString();
  const links = [
    "https://www.ipotec.in",
    "https://www.ipotec.in/ipo.xml",
    "https://www.ipotec.in/mutualfunds.xml",
    "https://www.ipotec.in/blog.xml",
    "https://www.ipotec.in/calculators.xml",
    "https://www.ipotec.in/others.xml",
    "https://www.ipotec.in/ifsc-details.xml",
    
  ];
  const mainSitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${links
      .map(
        (link) => `<url>
        <loc>${link}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>1.0</priority>
      </url>`
      )
      .join("")}
  </urlset>`;
  generateSitemapFile("sitemap.xml", mainSitemap);
}

async function generateIpoSitemap() {
  const currentDate = new Date().toISOString();
  const links = [
    "https://www.ipotec.in/ipo",
    "https://www.ipotec.in/ipo/upcomingIpo",
    "https://www.ipotec.in/ipo/greyMarketIpo",
    "https://www.ipotec.in/ipo/smeMarketIpo",
    "https://www.ipotec.in/ipo/subscriptionStatus",
    "https://www.ipotec.in/ipo/ipoForms",
    "https://www.ipotec.in/ipo/sharesBuyBack",
    "https://www.ipotec.in/ipo-details.xml",
  ];
  const ipoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${links
      .map(
        (link) => `<url>
        <loc>${link}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>1.0</priority>
      </url>`
      )
      .join("")}
  </urlset>`;
  generateSitemapFile("ipo.xml", ipoSitemap);
}

async function generateMfSitemap() {
  const currentDate = new Date().toISOString();
  const links = [
    "https://www.ipotec.in/mutualfunds",
    "https://www.ipotec.in/mutualfunds/screener",
    "https://www.ipotec.in/mutualfunds/amc",
    "https://www.ipotec.in/mutualfunds/category",
    "https://www.ipotec.in/mutualfunds-details.xml",
    "https://www.ipotec.in/amc.xml",
    "https://www.ipotec.in/category.xml",
    "https://www.ipotec.in/nfo.xml",
  ];
  const mfSitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${links
      .map(
        (link) => `<url>
        <loc>${link}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>1.0</priority>
      </url>`
      )
      .join("")}
  </urlset>`;
  generateSitemapFile("mutualfunds.xml", mfSitemap);
}

async function generateOthersSitemap() {
  const currentDate = new Date().toISOString();
  const links = [
    "https://www.ipotec.in/about-us",
    "https://www.ipotec.in/privacy-policy",
    "https://www.ipotec.in/terms-condition",
    "https://www.ipotec.in/disclaimer",
    "https://www.ipotec.in/contact",
    "https://www.ipotec.in/blogs",
  ];
  const othersSitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${links
      .map(
        (link) => `<url>
        <loc>${link}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>1.0</priority>
      </url>`
      )
      .join("")}
  </urlset>`;
  generateSitemapFile("others.xml", othersSitemap);
}

async function generateCalcSitemap() {
  const currentDate = new Date().toISOString();
  const links = [
    "https://www.ipotec.in/calculators",
    "https://www.ipotec.in/calculators/sip_calculator",
    "https://www.ipotec.in/calculators/lumpsum_calculator",
    "https://www.ipotec.in/calculators/swp_calculator",
  ];
  const othersSitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${links
      .map(
        (link) => `<url>
        <loc>${link}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>1.0</priority>
      </url>`
      )
      .join("")}
  </urlset>`;
  generateSitemapFile("calculators.xml", othersSitemap);
}

async function generateIpoDetailsSitemap() {
  const currentDate = new Date().toISOString();
  const ipoLinks = await fetchLinks(
    "https://apis-iota-five.vercel.app/api/getIpoLinks"
  );

  const ipoDetailsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${ipoLinks
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
  generateSitemapFile("ipo-details.xml", ipoDetailsSitemap);
}

async function generateIfscDetailsSitemap() {
  const currentDate = new Date().toISOString();
  const ifscLinks = await fetchLinks(
    "https://apis-iota-five.vercel.app/api/getIfsc/ICIC0000184?all=all"
  );

  const ifscDetailsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${ifscLinks.links
      .map(
        (link) => `
      <url>
        <loc>https://www.ipotec.in/ifsc-code/${link.replaceAll("&", "-")}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>0.80</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;
  generateSitemapFile("ifsc-details.xml", ifscDetailsSitemap);
}

async function generateNfoDetailsSitemap() {
  const currentDate = new Date().toISOString();
  const ipoLinks = await fetchLinks(
    "https://apis-iota-five.vercel.app/api/getNfoLinks"
  );

  const ipoDetailsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${ipoLinks
      .map(
        (link) => `
      <url>
        <loc>https://www.ipotec.in/mutualfunds/nfo/details/${link}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>0.80</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;
  generateSitemapFile("nfo.xml", ipoDetailsSitemap);
}

async function generateMfDetailsSitemap() {
  const currentDate = new Date().toISOString();
  const mfLinks = await fetchLinks(
    "https://apis-iota-five.vercel.app/api/getMfLinks"
  );
  const mfDetailsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${mfLinks
      .map(
        (link) => `
      <url>
        <loc>https://www.ipotec.in/mutualfunds/details/${link}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>0.80</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;
  generateSitemapFile("mutualfunds-details.xml", mfDetailsSitemap);
}

async function generateAmcSitemap() {
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
  const amcSitemap = `<?xml version="1.0" encoding="UTF-8"?>
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
  generateSitemapFile("amc.xml", amcSitemap);
}

async function generateCategorySitemap() {
  const currentDate = new Date().toISOString();
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
  const catsitemap = `<?xml version="1.0" encoding="UTF-8"?>
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
  generateSitemapFile("category.xml", catsitemap);
}

async function generateBlogsSitemap() {
  const blogs = await fetchLinks(
    "https://apis-iota-five.vercel.app/api/getBlogsLinks"
  );
  const catsitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${blogs
      .map(
        (blogData) => `
      <url>
        <loc>https://www.ipotec.in/blogs/${blogData.category}/${blogData.slug}</loc>
        <lastmod>${blogData.published}</lastmod>
        <priority>0.80</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;
  generateSitemapFile("blog.xml", catsitemap);
}

async function generateAllSitemaps() {
  try {
    await generateMainSitemap();
    await generateIpoSitemap();
    await generateMfSitemap();
    await generateOthersSitemap();
    await generateNfoDetailsSitemap();
    await generateCalcSitemap();
    await generateBlogsSitemap();
    await generateIpoDetailsSitemap();
    await generateIfscDetailsSitemap();
    // await generateMfDetailsSitemap();
    await generateAmcSitemap();
    await generateCategorySitemap();
    console.log("Sitemaps generated successfully!");
  } catch (error) {
    console.error("Error generating sitemaps:", error);
  }
}

generateAllSitemaps();
