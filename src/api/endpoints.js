const baseURL = "https://ipo.onlineinfotech.net/Apis/";

export const endpoints = {
  // Data Tables
  homePage: `${baseURL}homePage`,
  gmpData: `${baseURL}gmpData`,
  formsData: `${baseURL}formsData`,
  buyBackData: `${baseURL}buyBackData`,
  smeData: `${baseURL}smeData`,
  subscriptionData: `${baseURL}subscriptionData`,
  upcomingIpo: `${baseURL}upcomingIpo`,

  // Home Indices
  indices: `${baseURL}getIndices`,

  // Top Most
  gainers: `${baseURL}getTrendData?type=gainers`,
  losers: `${baseURL}getTrendData?type=losers`,
  mostActive: `${baseURL}getTrendData?type=active`,
  approachingHigh: `${baseURL}getTrendData?type=approachingHigh`,
  approachingLow: `${baseURL}getTrendData?type=approachingLow`,

  // Blogs
  getBlogs: `${baseURL}getBlogs`,
  blogDetails: `${baseURL}getBlogDetails`,

  // Ipo Details
  ipoDetails: `${baseURL}ipoDetails`,
  additionalIpo: `${baseURL}getAdditionalIpos`,

  // Check pan
  checkPan: `${baseURL}checkPan`,
  blogDetails: `${baseURL}getBlogDetails`,


  // MF 
  MfScreener: `${baseURL}getMfScreenerData`,
  getMfHomePage: `${baseURL}getMfHomePage`,
  getMfHomeChart: `${baseURL}getMfHomeChart`,




  
};
// charts: "https://www.moneycontrol.com/mc/widget/mfnavonetimeinvestment/get_chart_value?isin=INF204K01K15&dur=5Y&ind_id=&classic=true&type=benchmark&investmentType=Equity",
