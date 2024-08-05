const fs = require("fs");
const path = require("path");

async function fetchLinks(url) {
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  return data;
}

async function generateSitemap() {
  const currentDate = new Date().toISOString();

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

  const links2 = await fetchLinks(
    "https://apis-iota-five.vercel.app/api/getMfLinks"
  );
  const sitemap2 = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${links2
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

  const publicDir = path.join(__dirname, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, "ipo-details.xml"), sitemap1);
  fs.writeFileSync(path.join(publicDir, "mutualfunds-details.xml"), sitemap2);
  console.log(
    "Sitemaps generated at public/ipo-details.xml and public/mutualfunds-details.xml"
  );
}

generateSitemap().catch(console.error);
