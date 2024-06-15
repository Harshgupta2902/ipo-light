const baseURL = "https://ipo.onlineinfotech.net/Apis/";

export const endpoints = {
  indices: `${baseURL}getIndices`,

  gainers: `${baseURL}getTrendData?type=gainers`,
  losers: `${baseURL}getTrendData?type=losers`,
  mostActive: `${baseURL}getTrendData?type=active`,
  approachingHigh: `${baseURL}getTrendData?type=approachingHigh`,
  approachingLow: `${baseURL}getTrendData?type=approachingLow`,

  getBlogs: `${baseURL}getBlogs`,
  blogDetails: `${baseURL}getBlogDetails`,

  ipoDetails: `${baseURL}ipoDetails`,
  additionalIpo: `${baseURL}getAdditionalIpos`,

};
// charts: "https://www.moneycontrol.com/mc/widget/mfnavonetimeinvestment/get_chart_value?isin=INF204K01K15&dur=5Y&ind_id=&classic=true&type=benchmark&investmentType=Equity",
