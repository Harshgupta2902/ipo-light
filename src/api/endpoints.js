// const baseURL = "https://ipo.onlineinfotech.net/Apis/";
const baseURL = "https://apis-iota-five.vercel.app/api/";
// const baseURL = "http://localhost:3001/api/";

export const endpoints = {
  metaData: `${baseURL}meta-data`,

  homePage: `${baseURL}main`,
  upcomingIpo: `${baseURL}ipo`,
  gmpIpo: `${baseURL}gmp`,
  ipoForms: `${baseURL}forms`,
  ipoBuyBack: `${baseURL}buyback`,
  smeipo: `${baseURL}sme`,
  iposubs: `${baseURL}subs`,
  ipoDetails: `${baseURL}getDetails`,
  additionalIpo: `${baseURL}getAdditionalIpo`,

  indices: `${baseURL}getIndices`,
  gainers: `${baseURL}getTrend?type=gainers`,
  losers: `${baseURL}getTrend?type=losers`,
  mostActive: `${baseURL}getTrend?type=active`,
  approachingHigh: `${baseURL}getTrend?type=approachingHigh`,
  approachingLow: `${baseURL}getTrend?type=approachingLow`,

  getMfScreener: `${baseURL}getMfScreener`,
  getMfHomePage: `${baseURL}getMfHomePage`,
  getNav: `${baseURL}getNav`,

  insertBlog: `${baseURL}insertBlog`,

  blogDetails: `${baseURL}getBlogDetails`,
  getBlogs: `${baseURL}getblogs`,
  getMfHomeChart: `${baseURL}getMfHomeChart`,
  
  
  
  
  getMfLinks: `${baseURL}getMfLinks`,
  
  
};
