import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  ActivityIcon,
  AlertTriangleIcon,
} from "lucide-react";
import { PriceData, EventData, ChangePointData } from "@/data/mockData";
import { RealTimePriceData } from "@/services/oilPriceService";

interface StatsPanelProps {
  data: PriceData[];
  events: EventData[];
  changePoints: ChangePointData[];
  realTimePrice?: RealTimePriceData | null;
}

export function StatsPanel({
  data,
  events,
  changePoints,
  realTimePrice,
}: StatsPanelProps) {
  // Ensure data is available
  if (data.length === 0) return <div>No data</div>;

  // Calculate statistics
  const prices = data.map((d) => d.Price);
  // const currentPrice = realTimePrice?.price || prices[prices.length - 1];
  const currentPrice = 67.56; // Placeholder for real-time price
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice =
    prices.reduce((sum, price) => sum + price, 0) / prices.length;

  // Find dates for min/max prices
  const minPriceData = data.find((d) => d.Price === minPrice);
  const maxPriceData = data.find((d) => d.Price === maxPrice);

  // Calculate volatility (standard deviation)
  const variance =
    prices.reduce((sum, price) => sum + Math.pow(price - avgPrice, 2), 0) /
    prices.length;
  const volatility = Math.sqrt(variance);

  const stats = [
    {
      title: "Current Price",
      value: `$${currentPrice}`,
      subtitle: realTimePrice
        ? `${
            realTimePrice.change >= 0 ? "+" : ""
          }${realTimePrice.change.toFixed(
            2
          )} (${realTimePrice.changePercent.toFixed(1)}%) • Live`
        : "USD/barrel",
      icon: ActivityIcon,
      trend: realTimePrice
        ? realTimePrice.change >= 0
          ? "high"
          : "low"
        : null,
      color: realTimePrice
        ? realTimePrice.change >= 0
          ? "text-success"
          : "text-destructive"
        : "text-oil-price",
    },
    {
      title: "Highest Price",
      value: `$${maxPrice.toFixed(2)}`,
      subtitle: maxPriceData
        ? new Date(maxPriceData.Date).toLocaleDateString()
        : "",
      icon: TrendingUpIcon,
      trend: "high",
      color: "text-success",
    },
    {
      title: "Lowest Price",
      value: `$${minPrice.toFixed(2)}`,
      subtitle: minPriceData
        ? new Date(minPriceData.Date).toLocaleDateString()
        : "",
      icon: TrendingDownIcon,
      trend: "low",
      color: "text-destructive",
    },
    {
      title: "Average Price",
      value: `$${avgPrice.toFixed(2)}`,
      subtitle: `±$${volatility.toFixed(2)} volatility`,
      icon: ActivityIcon,
      trend: null,
      color: "text-muted-foreground",
    },
  ];

  const MS_PER_DAY = 24 * 60 * 60 * 1000; // Milliseconds in a day
  const WINDOW_DAYS = 50; // Window size in days

  const eventsNearChangePoints = events.filter((e) =>
    changePoints.some((cp) => {
      const eventDate = new Date(e.date).getTime();
      const cpDate = new Date(cp.date).getTime();
      return Math.abs(eventDate - cpDate) <= WINDOW_DAYS * MS_PER_DAY;
    })
  );
  // changePoints.some((cp) => cp.date === e.date)
  console.log("EC", events, changePoints);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="shadow-elegant hover:shadow-glow transition-shadow duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.subtitle}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-secondary ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Events and Change Points Summary */}
      <Card className="shadow-elegant md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangleIcon className="h-5 w-5" />
            Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Major Events</span>
            <Badge
              variant="secondary"
              className="bg-event-marker-bg text-event-marker"
            >
              {events.length} detected
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Change Points</span>
            <Badge
              variant="secondary"
              className="bg-change-point-bg text-change-point"
            >
              {changePoints.length} detected
            </Badge>
          </div>

          <div className="pt-2 text-xs text-muted-foreground">
            This analysis covers {data.length} data points spanning from{" "}
            {new Date(data[0]?.Date).toLocaleDateString()} to{" "}
            {new Date(data[data.length - 1]?.Date).toLocaleDateString()}.
          </div>
        </CardContent>
      </Card>

      {/* Events Near Change Points */}
      <Card className="shadow-elegant md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangleIcon className="h-5 w-5" />
            Events Near Change Points
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="">
            {/* render events close to change points */}
            {eventsNearChangePoints.length > 0 ? (
              eventsNearChangePoints.map((event, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{event.event}</span>
                  <Badge
                    variant="secondary"
                    className="bg-event-marker-bg text-event-marker"
                  >
                    {new Date(event.date).toLocaleDateString()}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No events near change points detected.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
