import { fetchChangePointsData } from "@/services/changePointService";
import { fetchEventsData } from "@/services/eventService";
import { fetchPriceData } from "@/services/priceService";
// Mock data for Brent oil prices, events, and change points

export interface PriceData {
  Date: string;
  Log_Return?: number; // Optional for historical data
  Price: number;
}

export interface EventData {
  date: string;
  event: string;
}

export interface ChangePointData {
  label: string;
  date: string;
  description: string;
  segment: string;
}

// Generate mock Brent oil price data from 2020-2024
export const generatePriceData = await fetchPriceData();

// export const generatePriceData = async (): Promise<PriceData[]> => {
//   const data: PriceData[] = [];
//   const startDate = new Date("2020-01-01");
//   const endDate = new Date("2024-12-31");

//   let currentPrice = 67.2; // Starting price

//   for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 7)) {
//     // Add some volatility and trends
//     const volatility = (Math.random() - 0.5) * 8;
//     const trend =
//       Math.sin(
//         ((d.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365)) *
//           Math.PI *
//           2
//       ) * 5;

//     currentPrice += volatility + trend * 0.1;
//     currentPrice = Math.max(15, Math.min(120, currentPrice)); // Keep within realistic bounds

//     data.push({
//       date: d.toISOString().split("T")[0],
//       price: Math.round(currentPrice * 100) / 100,
//     });
//   }

//   return data;
// };

export const events: EventData[] = await fetchEventsData();

export const changePoints: ChangePointData[] = await fetchChangePointsData();
