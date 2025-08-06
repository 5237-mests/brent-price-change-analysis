import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CalendarIcon, FilterIcon } from 'lucide-react';

interface FilterPanelProps {
  startDate: string;
  endDate: string;
  showEvents: boolean;
  showChangePoints: boolean;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onShowEventsChange: (show: boolean) => void;
  onShowChangePointsChange: (show: boolean) => void;
  onReset: () => void;
}

export function FilterPanel({
  startDate,
  endDate,
  showEvents,
  showChangePoints,
  onStartDateChange,
  onEndDateChange,
  onShowEventsChange,
  onShowChangePointsChange,
  onReset,
}: FilterPanelProps) {
  return (
    <Card className="h-fit shadow-elegant">
      <CardHeader className="bg-gradient-primary text-primary-foreground">
        <CardTitle className="flex items-center gap-2">
          <FilterIcon className="h-5 w-5" />
          Filters & Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Date Range */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-foreground">Date Range</Label>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-xs text-muted-foreground">
                Start Date
              </Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => onStartDateChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-xs text-muted-foreground">
                End Date
              </Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => onEndDateChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Display Options */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-foreground">Display Options</Label>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="show-events" className="text-sm">Event Markers</Label>
              <p className="text-xs text-muted-foreground">Show geopolitical events</p>
            </div>
            <Switch
              id="show-events"
              checked={showEvents}
              onCheckedChange={onShowEventsChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="show-change-points" className="text-sm">Change Points</Label>
              <p className="text-xs text-muted-foreground">Show detected price shifts</p>
            </div>
            <Switch
              id="show-change-points"
              checked={showChangePoints}
              onCheckedChange={onShowChangePointsChange}
            />
          </div>
        </div>

        {/* Reset Button */}
        <Button 
          variant="outline" 
          onClick={onReset}
          className="w-full"
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}