"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Color constants for the charts
const BOOKINGS_COLOR = "#1e40af" // Deep blue for bookings
const REVENUE_COLOR = "#3b82f6" // Medium blue for revenue
const OCCUPANCY_COLOR = "#60a5fa" // Light blue for occupancy rate
const PERCENTAGE_COLOR = "#93c5fd" // Lighter blue for percentages
const BOOKINGS_FILL = "#1e40af33" // Semi-transparent fills
const REVENUE_FILL = "#3b82f633"
const OCCUPANCY_FILL = "#60a5fa33"
const PERCENTAGE_FILL = "#93c5fd33"

// Property-specific booking data
const propertyBookingTrends = {
  "Destin Beachfront": [
    { month: "Jan", bookings: 22, revenue: 8800, avgNightlyRate: 400 },
    { month: "Feb", bookings: 24, revenue: 9600, avgNightlyRate: 400 },
    { month: "Mar", bookings: 26, revenue: 11700, avgNightlyRate: 450 },
    { month: "Apr", bookings: 20, revenue: 9000, avgNightlyRate: 450 },
    { month: "May", bookings: 18, revenue: 7200, avgNightlyRate: 400 },
    { month: "Jun", bookings: 19, revenue: 7600, avgNightlyRate: 400 },
    { month: "Jul", bookings: 23, revenue: 9200, avgNightlyRate: 400 },
    { month: "Aug", bookings: 21, revenue: 8400, avgNightlyRate: 400 },
    { month: "Sep", bookings: 15, revenue: 5250, avgNightlyRate: 350 },
    { month: "Oct", bookings: 17, revenue: 5950, avgNightlyRate: 350 },
    { month: "Nov", bookings: 18, revenue: 6300, avgNightlyRate: 350 },
    { month: "Dec", bookings: 21, revenue: 8400, avgNightlyRate: 400 },
  ],
  "Panama City Condo": [
    { month: "Jan", bookings: 18, revenue: 6300, avgNightlyRate: 350 },
    { month: "Feb", bookings: 20, revenue: 7000, avgNightlyRate: 350 },
    { month: "Mar", bookings: 22, revenue: 8800, avgNightlyRate: 400 },
    { month: "Apr", bookings: 19, revenue: 7600, avgNightlyRate: 400 },
    { month: "May", bookings: 16, revenue: 5600, avgNightlyRate: 350 },
    { month: "Jun", bookings: 17, revenue: 5950, avgNightlyRate: 350 },
    { month: "Jul", bookings: 20, revenue: 7000, avgNightlyRate: 350 },
    { month: "Aug", bookings: 18, revenue: 6300, avgNightlyRate: 350 },
    { month: "Sep", bookings: 14, revenue: 4200, avgNightlyRate: 300 },
    { month: "Oct", bookings: 15, revenue: 4500, avgNightlyRate: 300 },
    { month: "Nov", bookings: 16, revenue: 4800, avgNightlyRate: 300 },
    { month: "Dec", bookings: 19, revenue: 6650, avgNightlyRate: 350 },
  ],
  // Portfolio overview data
  "Portfolio Overview": [
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
  ],
}

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
  const [selectedProperty, setSelectedProperty] = useState("Portfolio Overview")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vacation Booking Metrics</CardTitle>
        <CardDescription>Track booking performance across your Florida beach vacation properties</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger>
              <SelectValue>{selectedProperty}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Portfolio Overview">Portfolio Overview</SelectItem>
              {propertyBookingData.map((property) => (
                <SelectItem key={property.name} value={property.name}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
                  color: BOOKINGS_COLOR,
                },
                revenue: {
                  label: "Revenue ($)",
                  color: REVENUE_COLOR,
                },
                avgNightlyRate: {
                  label: "Avg. Nightly Rate ($)",
                  color: OCCUPANCY_COLOR,
                },
              }}
            >
              <AreaChart 
                data={propertyBookingTrends[selectedProperty as keyof typeof propertyBookingTrends]} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }} 
                height={350}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="bookings"
                  stroke={BOOKINGS_COLOR}
                  fill={BOOKINGS_FILL}
                  fillOpacity={0.3}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke={REVENUE_COLOR}
                  fill={REVENUE_FILL}
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
                  color: BOOKINGS_COLOR,
                },
                revenue: {
                  label: "Revenue ($)",
                  color: REVENUE_COLOR,
                },
                occupancyRate: {
                  label: "Occupancy Rate (%)",
                  color: OCCUPANCY_COLOR,
                },
              }}
            >
              <BarChart data={propertyBookingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} height={350}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar yAxisId="left" dataKey="bookings" fill={BOOKINGS_COLOR} radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="revenue" fill={REVENUE_COLOR} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="sources">
            <ChartContainer
              config={{
                bookings: {
                  label: "Bookings",
                  color: BOOKINGS_COLOR,
                },
                percentage: {
                  label: "Percentage (%)",
                  color: PERCENTAGE_COLOR,
                },
              }}
            >
              <BarChart data={bookingSourceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} height={350}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="source" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar yAxisId="left" dataKey="bookings" fill={BOOKINGS_COLOR} radius={[4, 4, 0, 0]} />
                <Bar
                  yAxisId="right"
                  dataKey="percentOfTotal"
                  fill={PERCENTAGE_COLOR}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
