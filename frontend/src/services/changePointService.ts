import { ChangePointData } from "@/data/mockData";

export const fetchChangePointsData = async (): Promise<ChangePointData[]> => {
  const response = await fetch("http://127.0.0.1:5000/api/change-points");
  const data = await response.json();
  return data;
};
