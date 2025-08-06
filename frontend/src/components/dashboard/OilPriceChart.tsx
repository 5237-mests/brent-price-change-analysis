import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUpIcon } from "lucide-react";
import { PriceData, EventData, ChangePointData } from "@/data/mockData";

interface OilPriceChartProps {
  data: PriceData[];
  events: EventData[];
  changePoints: ChangePointData[];
  showEvents: boolean;
  showChangePoints: boolean;
}

export function OilPriceChart({
  data,
  events,
  changePoints,
  showEvents,
  showChangePoints,
}: OilPriceChartProps) {
  console.log("OilPriceChart data:", data);
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) {
      return null;
    }

    const date = new Date(label);
    const price = payload[0].value;

    // Find event on this date
    const event = events.find((e) => e.date === label);

    // Find change point on this date
    const changePoint = changePoints.find((cp) => cp.date === label);

    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm">
        <p className="font-medium text-card-foreground">
          {format(date, "MMM dd, yyyy")}
        </p>
        <p className="text-oil-price font-bold text-lg">
          ${price.toFixed(2)}/barrel
        </p>
        {event && showEvents && (
          <div className="mt-2 p-2 bg-event-marker-bg rounded">
            <p className="font-medium text-event-marker text-sm">
              {event.date}
            </p>
            {event.event && (
              <p className="text-xs text-muted-foreground mt-1">
                {event.event}
              </p>
            )}
          </div>
        )}
        {changePoint && showChangePoints && (
          <div className="mt-2 p-2 bg-change-point-bg rounded">
            <p className="font-medium text-change-point text-sm">
              Change Point
            </p>
            <p className="text-xs text-muted-foreground">
              Mean: oldprice → $ newprice
            </p>
          </div>
        )}
      </div>
    );
  };

  // Get current price and trend
  // const currentPrice = data[data.length - 1]?.price || 0;
  const currentPrice = 67.56; // Placeholder for real-time price
  // const previousPrice = data[data.length - 2]?.price || 0;
  const previousPrice = 67.5; // Placeholder for real-time price
  const priceChange = currentPrice - previousPrice;
  const percentChange = (priceChange / previousPrice) * 100;

  return (
    <Card className="shadow-elegant">
      <CardHeader className="bg-gradient-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5" />
            Brent Crude Oil Price
          </CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold">${currentPrice.toFixed(2)}</div>
            <Badge
              variant={priceChange >= 0 ? "default" : "destructive"}
              className="text-xs"
            >
              {priceChange >= 0 ? "+" : ""}
              {priceChange.toFixed(2)} ({percentChange.toFixed(1)}%)
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--oil-price))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--oil-price))"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />

              <XAxis
                dataKey="Date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  if (isNaN(date.getTime())) return "";
                  return format(date, "MMM yy");
                }}
                interval="preserveStartEnd"
              />

              <YAxis
                tick={{ fontSize: 12 }}
                label={{
                  value: "Price (USD/barrel)",
                  angle: -90,
                  position: "insideLeft",
                }}
                domain={["dataMin - 5", "dataMax + 5"]}
              />

              <Tooltip content={<CustomTooltip />} />

              <Line
                type="monotone"
                dataKey="Price"
                stroke="hsl(var(--oil-price))"
                strokeWidth={2}
                dot={false}
                fill="url(#priceGradient)"
                activeDot={{
                  r: 6,
                  stroke: "hsl(var(--oil-price))",
                  strokeWidth: 2,
                }}
              />

              {/* Event markers */}
              {showEvents &&
                events.map((event) => (
                  <ReferenceLine
                    key={event.date}
                    x={event.date}
                    stroke="hsl(var(--event-marker))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    label={{
                      value: event.event,
                      position: "top",
                      style: {
                        fontSize: "10px",
                        fill: "hsl(var(--event-marker))",
                        fontWeight: "bold",
                      },
                    }}
                  />
                ))}

              {/* Change points */}
              {showChangePoints &&
                changePoints.map((cp) => (
                  <ReferenceLine
                    key={cp.date}
                    x={cp.date}
                    stroke="hsl(var(--change-point))"
                    strokeWidth={2}
                    strokeDasharray="8 4"
                    label={{
                      value: "CP",
                      position: "bottom",
                      style: {
                        fontSize: "10px",
                        fill: "hsl(var(--change-point))",
                        fontWeight: "bold",
                      },
                    }}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-oil-price"></div>
            <span>Oil Price</span>
          </div>
          {showEvents && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-event-marker border-dashed border-t-2 border-event-marker"></div>
              <span>Events</span>
            </div>
          )}
          {showChangePoints && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-change-point border-dashed border-t-2 border-change-point"></div>
              <span>Change Points</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
