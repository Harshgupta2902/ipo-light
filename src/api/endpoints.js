export const endpoints = {
  indices: "https://analyze.api.tickertape.in/homepage/indices",

  // Top Gainers, Losers, and all
  ganiers:
    "https://analyze.api.tickertape.in/homepage/stocks?universe=Market&type=gainers&dataCount=5&offset=0",
  losers:
    "https://analyze.api.tickertape.in/homepage/stocks?universe=Market&type=losers&dataCount=5&offset=0",
  mostActive:
    "https://analyze.api.tickertape.in/homepage/stocks?universe=Market&type=active&dataCount=5&offset=0",
  approachingHigh:
    "https://analyze.api.tickertape.in/homepage/stocks?universe=Market&type=approachingHigh&dataCount=5&offset=0",
  approachingLow:
    "https://analyze.api.tickertape.in/homepage/stocks?universe=Market&type=approachingLow&dataCount=5&offset=0",



    
  // My Server

  getBlogs: "https://ipo.onlineinfotech.net/Apis/getBlogs",
  blogDetails: "https://ipo.onlineinfotech.net/Apis/getBlogDetails",

  // charts: "https://www.moneycontrol.com/mc/widget/mfnavonetimeinvestment/get_chart_value?isin=INF204K01K15&dur=5Y&ind_id=&classic=true&type=benchmark&investmentType=Equity",
};
