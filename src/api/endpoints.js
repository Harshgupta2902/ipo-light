// const baseURL = "https://ipo.onlineinfotech.net/Apis/";
const baseURL = "https://apis-iota-five.vercel.app/api/";

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
  getBlogs: `${baseURL}getBlogs`,

  getMfHomeChart: `${baseURL}getMfHomeChart`,
};

// export const endpoints = {
//   // Data Tables
//   homePage: `${baseURL}homePage`,
//   gmpData: `${baseURL}gmpData`,
//   formsData: `${baseURL}formsData`,
//   buyBackData: `${baseURL}buyBackData`,
//   smeData: `${baseURL}smeData`,
//   subscriptionData: `${baseURL}subscriptionData`,
//   upcomingIpo: `${baseURL}upcomingIpo`,

//   // Home Indices
//   indices: `${baseURL}getIndices`,

//   // Top Most
//   gainers: `${baseURL}getTrendData?type=gainers`,
//   losers: `${baseURL}getTrendData?type=losers`,
//   mostActive: `${baseURL}getTrendData?type=active`,
//   approachingHigh: `${baseURL}getTrendData?type=approachingHigh`,
//   approachingLow: `${baseURL}getTrendData?type=approachingLow`,

//   // Blogs
//   getBlogs: `${baseURL}getBlogs`,

//   // Ipo Details
//   ipoDetails: `${baseURL}ipoDetails`,
//   additionalIpo: `${baseURL}getAdditionalIpos`,

//   // Check pan
//   checkPan: `${baseURL}checkPan`,
//   blogDetails: `${baseURL}getBlogDetails`,

//   // MF
//   MfScreener: `${baseURL}getMfScreenerData`,
//   getMfHomePage: `${baseURL}getMfHomePage`,
//   getMfHomeChart: `${baseURL}getMfHomeChart`,
// };
