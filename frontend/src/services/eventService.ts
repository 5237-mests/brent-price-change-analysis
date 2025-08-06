import { EventData } from "@/data/mockData";

export const fetchEventsData = async (): Promise<EventData[]> => {
  const response = await fetch("http://127.0.0.1:5000/api/key-events");
  const data = await response.json();
  return data;
};
