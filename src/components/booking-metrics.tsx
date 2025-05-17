"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"

// More realistic Florida vacation rental data with seasonal patterns
const bookingData = [
  { month: "Jan", bookings: 92, revenue: 32400, avgNightlyRate: 352 },
  { month: "Feb", bookings: 98, revenue: 35800, avgNightlyRate: 365 },
  { month: "Mar", bookings: 105, revenue: 42000, avgNightlyRate: 400 },
  { month: "Apr", bookings: 87, revenue: 34800, avgNightlyRate: 400 },
  { month: "May", bookings: 76, revenue: 26600, avgNightlyRate: 350 },
  { month: "Jun", bookings: 82, revenue: 28700, avgNightlyRate: 350 },
  { month: "Jul", bookings: 95, revenue: 33250, avgNightlyRate: 350 },
  { month: "Aug", bookings: 88, revenue: 30800, avgNightlyRate: 350 },
  { month: "Sep", bookings: 65, revenue: 19500, avgNightlyRate: 300 },
  { month: "Oct", bookings: 72, revenue: 21600, avgNightlyRate: 300 },
  { month: "Nov", bookings: 78, revenue: 23400, avgNightlyRate: 300 },
  { month: "Dec", bookings: 90, revenue: 31500, avgNightlyRate: 350 },
]

const propertyBookingData = [
  { name: "Destin Beachfront", bookings: 187, revenue: 93500, occupancyRate: 92 },
  { name: "Panama City Condo", bookings: 165, revenue: 74250, occupancyRate: 88 },
  { name: "Clearwater Villa", bookings: 142, revenue: 63900, occupancyRate: 85 },
  { name: "Siesta Key Cottage", bookings: 156, revenue: 62400, occupancyRate: 82 },
  { name: "Naples Beachhouse", bookings: 178, revenue: 89000, occupancyRate: 90 },
]

// New data for booking sources
const bookingSourceData = [
  { source: "Direct Website", bookings: 328, percentage: 40 },
  { source: "Airbnb", bookings: 246, percentage: 30 },
  { source: "VRBO", bookings: 164, percentage: 20 },
  { source: "Booking.com", bookings: 82, percentage: 10 },
]

export function BookingMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vacation Booking Metrics</CardTitle>
        <CardDescription>Track booking performance across your Florida beach vacation properties</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trends">
          <TabsList className="mb-4">
            <TabsTrigger value="trends">Booking Trends</TabsTrigger>
            <TabsTrigger value="properties">By Property</TabsTrigger>
            <TabsTrigger value="sources">Booking Sources</TabsTrigger>
          </TabsList>
          <TabsContent value="trends" className="space-y-4">
            <ChartContainer
              config={{
                bookings: {
                  label: "Bookings",
                  color: "hsl(var(--chart-1))",
                },
                revenue: {
                  label: "Revenue ($)",
                  color: "hsl(var(--chart-2))",
                },
                avgNightlyRate: {
                  label: "Avg. Nightly Rate ($)",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <AreaChart data={bookingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} height={350}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="bookings"
                  stroke="var(--color-bookings)"
                  fill="var(--color-bookings)"
                  fillOpacity={0.3}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  fill="var(--color-revenue)"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="properties">
            <ChartContainer
              config={{
                bookings: {
                  label: "Bookings",
                  color: "hsl(var(--chart-1))",
                },
                revenue: {
                  label: "Revenue ($)",
                  color: "hsl(var(--chart-2))",
                },
                occupancyRate: {
                  label: "Occupancy Rate (%)",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <BarChart data={propertyBookingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} height={350}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar yAxisId="left" dataKey="bookings" fill="var(--color-bookings)" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="sources">
            <ChartContainer
              config={{
                bookings: {
                  label: "Bookings",
                  color: "hsl(var(--chart-1))",
                },
                percentage: {
                  label: "Percentage (%)",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <BarChart data={bookingSourceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} height={350}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar yAxisId="left" dataKey="bookings" fill="var(--color-bookings)" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="percentage" fill="var(--color-percentage)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
