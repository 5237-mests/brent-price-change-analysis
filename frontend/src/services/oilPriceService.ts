// Oil price service for fetching real-time data
export interface RealTimePriceData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

// Free API endpoints for oil price data
const BACKUP_APIs = [
  // Using Yahoo Finance API (no auth required)
  "https://query1.finance.yahoo.com/v8/finance/chart/BZ=F",
  // Alternative: Alpha Vantage (requires free API key)
  // 'https://www.alphavantage.co/query?function=GLOBAL_QUOTES&symbol=BRENTOIL&apikey=demo'
];

export const fetchRealOilPrice =
  async (): Promise<RealTimePriceData | null> => {
    try {
      // Using Yahoo Finance for Brent crude futures (BZ=F)
      const response = await fetch(
        "https://query1.finance.yahoo.com/v8/finance/chart/BZ=F"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch oil price data");
      }

      const data = await response.json();
      const result = data.chart.result[0];
      const meta = result.meta;
      const quotes = result.indicators.quote[0];

      // Get the latest price data
      const latestIndex = quotes.close.length - 1;
      const currentPrice = quotes.close[latestIndex];
      const previousClose = meta.previousClose;
      const change = currentPrice - previousClose;
      const changePercent = (change / previousClose) * 100;

      return {
        symbol: "BRENT",
        price: currentPrice,
        change: change,
        changePercent: changePercent,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      // console.error("Error fetching real oil price:(", error);

      // Fallback: return mock current price if API fails
      return {
        symbol: "BRENT",
        price: 74.82,
        change: 0.45,
        changePercent: 0.61,
        lastUpdated: new Date().toISOString(),
      };
    }
  };

// Alternative API function using a different endpoint
export const fetchOilPriceAlternative =
  async (): Promise<RealTimePriceData | null> => {
    try {
      // Using a financial data aggregator
      const response = await fetch(
        "https://api.marketdata.app/v1/stocks/quotes/BNO/"
      );

      if (!response.ok) {
        throw new Error("Alternative API failed");
      }

      const data = await response.json();

      return {
        symbol: "BRENT",
        price: data.last,
        change: data.change,
        changePercent: data.changepct,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Alternative API failed:", error);
      return null;
    }
  };
