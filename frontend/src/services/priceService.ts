import { PriceData } from "@/data/mockData";

export const fetchPriceData = async (): Promise<PriceData[]> => {
  const response = await fetch("http://127.0.0.1:5000/api/price-returns");
  const data = await response.json();
  return data;
};
