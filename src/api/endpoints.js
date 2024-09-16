// const baseURL = "https://apis-iota-five.vercel.app/api/";
const baseURL = "http://localhost:4000/api/";

export const endpoints = {
  metaData: `${baseURL}meta-data`,

  upcomingIpo: `${baseURL}ipo`,
  homePage: `${baseURL}main`,
  smeipo: `${baseURL}sme`,
  gmpIpo: `${baseURL}gmp`,
  ipoBuyBack: `${baseURL}buyback`,
  ipoForms: `${baseURL}forms`,
  iposubs: `${baseURL}subs`,
  ipoDetails: `${baseURL}getDetails`,
  additionalIpo: `${baseURL}getAdditionalIpo`,
  getIpoLinks: `${baseURL}getIpoLinks`,

  getMfDetails: `${baseURL}getMfDetails`,
  getMfScreener: `${baseURL}getMfScreener`,
  getNav: `${baseURL}getNav`,
  getMfLinks: `${baseURL}getMfLinks`,
  amc: `${baseURL}amc`,
  nfo: `${baseURL}nfo`,
  getNfoDetails: `${baseURL}getNfoDetails`,

  insertBlog: `${baseURL}insertBlog`,
  blogDetails: `${baseURL}getBlogDetails`,
  getBlogs: `${baseURL}getblogs`,

  getIfsc: `${baseURL}getIfsc`,
  geBankDetails: `${baseURL}geBankDetails`,

  getPincode: `${baseURL}getPincode`,
};

// getMfHomeChart: `${baseURL}getMfHomeChart`,
// indices: `${baseURL}getIndices`,
// gainers: `${baseURL}getTrend?type=gainers`,
// losers: `${baseURL}getTrend?type=losers`,
// mostActive: `${baseURL}getTrend?type=active`,
// approachingHigh: `${baseURL}getTrend?type=approachingHigh`,
// approachingLow: `${baseURL}getTrend?type=approachingLow`,
