import { useState, useMemo, useEffect } from "react";
import { FilterPanel } from "./FilterPanel";
import { OilPriceChart } from "./OilPriceChart";
import { StatsPanel } from "./StatsPanel";
import { generatePriceData, events, changePoints } from "@/data/mockData";
import {
  fetchRealOilPrice,
  RealTimePriceData,
} from "@/services/oilPriceService";

export function OilDashboard() {
  // Generate price data
  // const allPriceData = useMemo(() => generatePriceData(), []);
  const allPriceData = generatePriceData;
  // Filter states
  const [startDate, setStartDate] = useState("1987-05-20");
  const [endDate, setEndDate] = useState("2022-09-30");
  const [showEvents, setShowEvents] = useState(true);
  const [showChangePoints, setShowChangePoints] = useState(true);

  // Real-time price state
  const [realTimePrice, setRealTimePrice] = useState<RealTimePriceData | null>(
    null
  );
  const [isLoadingPrice, setIsLoadingPrice] = useState(true);

  // Fetch real-time oil price
  useEffect(() => {
    const fetchPrice = async () => {
      setIsLoadingPrice(true);
      const price = await fetchRealOilPrice();
      setRealTimePrice(price);
      setIsLoadingPrice(false);
    };

    fetchPrice();

    // Update price every 5 minutes
    const interval = setInterval(fetchPrice, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Filter data based on date range
  const filteredData = useMemo(() => {
    return allPriceData.filter((item) => {
      const itemDate = new Date(item.Date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return itemDate >= start && itemDate <= end;
    });
  }, [allPriceData, startDate, endDate]);

  // Filter events and change points based on date range
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return eventDate >= start && eventDate <= end;
    });
  }, [startDate, endDate]);

  const filteredChangePoints = useMemo(() => {
    return changePoints.filter((cp) => {
      const cpDate = new Date(cp.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return cpDate >= start && cpDate <= end;
    });
  }, [startDate, endDate]);

  const handleReset = () => {
    setStartDate("2020-01-01");
    setEndDate("2024-12-31");
    setShowEvents(true);
    setShowChangePoints(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground py-8 shadow-elegant">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Brent Oil Price Dashboard</h1>
            <p className="text-primary-foreground/80 text-lg">
              Interactive analysis of oil prices with geopolitical events and
              change point detection
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Panel */}
        <div className="mb-8">
          <StatsPanel
            data={filteredData}
            events={filteredEvents}
            changePoints={filteredChangePoints}
            realTimePrice={realTimePrice}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <FilterPanel
              startDate={startDate}
              endDate={endDate}
              showEvents={showEvents}
              showChangePoints={showChangePoints}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onShowEventsChange={setShowEvents}
              onShowChangePointsChange={setShowChangePoints}
              onReset={handleReset}
            />
          </div>

          {/* Chart */}
          <div className="lg:col-span-3">
            <OilPriceChart
              data={filteredData}
              events={filteredEvents}
              changePoints={filteredChangePoints}
              showEvents={showEvents}
              showChangePoints={showChangePoints}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Dashboard showing Brent crude oil prices with major geopolitical
            events and statistical change point analysis. Data includes price
            movements, OPEC decisions, and global events affecting oil markets.
          </p>
        </div>
      </div>
    </div>
  );
}
