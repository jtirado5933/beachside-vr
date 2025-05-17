"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts"

const seasonalRateData = [
  { month: "Jan", avgRate: 325, occupancy: 88, revenue: 28600 },
  { month: "Feb", avgRate: 350, occupancy: 92, revenue: 32200 },
  { month: "Mar", avgRate: 375, occupancy: 95, revenue: 35625 },
  { month: "Apr", avgRate: 350, occupancy: 90, revenue: 31500 },
  { month: "May", avgRate: 300, occupancy: 82, revenue: 24600 },
  { month: "Jun", avgRate: 325, occupancy: 85, revenue: 27625 },
  { month: "Jul", avgRate: 350, occupancy: 88, revenue: 30800 },
  { month: "Aug", avgRate: 325, occupancy: 85, revenue: 27625 },
  { month: "Sep", avgRate: 275, occupancy: 75, revenue: 20625 },
  { month: "Oct", avgRate: 300, occupancy: 80, revenue: 24000 },
  { month: "Nov", avgRate: 325, occupancy: 85, revenue: 27625 },
  { month: "Dec", avgRate: 350, occupancy: 90, revenue: 31500 },
]

const weatherImpactData = [
  { month: "Jan", avgTemp: 68, bookingRate: 88, cancellations: 2 },
  { month: "Feb", avgTemp: 70, bookingRate: 92, cancellations: 1 },
  { month: "Mar", avgTemp: 74, bookingRate: 95, cancellations: 0 },
  { month: "Apr", avgTemp: 78, bookingRate: 90, cancellations: 1 },
  { month: "May", avgTemp: 82, bookingRate: 82, cancellations: 3 },
  { month: "Jun", avgTemp: 86, bookingRate: 85, cancellations: 4 },
  { month: "Jul", avgTemp: 88, bookingRate: 88, cancellations: 5 },
  { month: "Aug", avgTemp: 88, bookingRate: 85, cancellations: 8 },
  { month: "Sep", avgTemp: 86, bookingRate: 75, cancellations: 12 },
  { month: "Oct", avgTemp: 82, bookingRate: 80, cancellations: 6 },
  { month: "Nov", avgTemp: 76, bookingRate: 85, cancellations: 2 },
  { month: "Dec", avgTemp: 70, bookingRate: 90, cancellations: 1 },
]

export function SeasonalAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seasonal Analysis</CardTitle>
        <CardDescription>
          Track seasonal patterns and weather impacts on your Florida beach vacation rentals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rates">
          <TabsList className="mb-4">
            <TabsTrigger value="rates">Seasonal Rates</TabsTrigger>
            <TabsTrigger value="weather">Weather Impact</TabsTrigger>
          </TabsList>
          <TabsContent value="rates" className="space-y-4">
            <ChartContainer
              config={{
                avgRate: {
                  label: "Average Nightly Rate ($)",
                  color: "hsl(var(--chart-1))",
                },
                occupancy: {
                  label: "Occupancy Rate (%)",
                  color: "hsl(var(--chart-2))",
                },
                revenue: {
                  label: "Average Monthly Revenue ($)",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <LineChart data={seasonalRateData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} height={350}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="avgRate" stroke="var(--color-avgRate)" strokeWidth={2} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="occupancy"
                  stroke="var(--color-occupancy)"
                  strokeWidth={2}
                />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="weather">
            <ChartContainer
              config={{
                avgTemp: {
                  label: "Average Temperature (°F)",
                  color: "hsl(var(--chart-1))",
                },
                bookingRate: {
                  label: "Booking Rate (%)",
                  color: "hsl(var(--chart-2))",
                },
                cancellations: {
                  label: "Cancellations",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <AreaChart data={weatherImpactData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} height={350}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="avgTemp"
                  stroke="var(--color-avgTemp)"
                  fill="var(--color-avgTemp)"
                  fillOpacity={0.3}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="bookingRate"
                  stroke="var(--color-bookingRate)"
                  fill="var(--color-bookingRate)"
                  fillOpacity={0.3}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="cancellations"
                  stroke="var(--color-cancellations)"
                  fill="var(--color-cancellations)"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
