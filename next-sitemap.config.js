// next-sitemap.config.js
module.exports = {
  siteUrl: "https://www.ipotech.in", // Replace with your site URL
  generateRobotsTxt: false, // (optional)
  sitemapSize: 5000, // Adjust this number if needed (default is 50000)
  sitemapFilename: "ipo-details1.xml", // Set the sitemap filename
  async additionalPaths(config) {
    // Fetch the slugs from the API
    const res = await fetch("https://apis-iota-five.vercel.app/api/getMfLinks");
    const slugs = await res.json();

    // Map the slugs to the required format
    return slugs.map((slug) => ({
      loc: slug.url,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '1.00',
    }));
  },
};
