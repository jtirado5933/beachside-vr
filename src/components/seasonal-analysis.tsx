"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Color constants for the charts
const RATE_COLOR = "#1e40af" // Deep blue for rates
const OCCUPANCY_COLOR = "#3b82f6" // Medium blue for occupancy
const REVENUE_COLOR = "#60a5fa" // Light blue for revenue
const TEMP_COLOR = "#1e40af" // Deep blue for temperature
const BOOKING_COLOR = "#3b82f6" // Medium blue for booking rate
const CANCEL_COLOR = "#60a5fa" // Light blue for cancellations

// Property-specific seasonal rate data
const propertySeasonalData = {
  "Portfolio Overview": [
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
  ],
  "Destin Beachfront": [
    { month: "Jan", avgRate: 350, occupancy: 90, revenue: 31500 },
    { month: "Feb", avgRate: 375, occupancy: 94, revenue: 35250 },
    { month: "Mar", avgRate: 400, occupancy: 96, revenue: 38400 },
    { month: "Apr", avgRate: 375, occupancy: 92, revenue: 34500 },
    { month: "May", avgRate: 325, occupancy: 85, revenue: 27625 },
    { month: "Jun", avgRate: 350, occupancy: 88, revenue: 30800 },
    { month: "Jul", avgRate: 375, occupancy: 90, revenue: 33750 },
    { month: "Aug", avgRate: 350, occupancy: 87, revenue: 30450 },
    { month: "Sep", avgRate: 300, occupancy: 78, revenue: 23400 },
    { month: "Oct", avgRate: 325, occupancy: 82, revenue: 26650 },
    { month: "Nov", avgRate: 350, occupancy: 88, revenue: 30800 },
    { month: "Dec", avgRate: 375, occupancy: 92, revenue: 34500 },
  ],
  // Add data for other properties...
}

// Property-specific weather impact data
const propertyWeatherData = {
  "Portfolio Overview": [
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
  ],
  "Destin Beachfront": [
    { month: "Jan", avgTemp: 65, bookingRate: 90, cancellations: 1 },
    { month: "Feb", avgTemp: 68, bookingRate: 94, cancellations: 0 },
    { month: "Mar", avgTemp: 72, bookingRate: 96, cancellations: 0 },
    { month: "Apr", avgTemp: 76, bookingRate: 92, cancellations: 1 },
    { month: "May", avgTemp: 80, bookingRate: 85, cancellations: 2 },
    { month: "Jun", avgTemp: 84, bookingRate: 88, cancellations: 3 },
    { month: "Jul", avgTemp: 86, bookingRate: 90, cancellations: 4 },
    { month: "Aug", avgTemp: 86, bookingRate: 87, cancellations: 6 },
    { month: "Sep", avgTemp: 84, bookingRate: 78, cancellations: 8 },
    { month: "Oct", avgTemp: 80, bookingRate: 82, cancellations: 4 },
    { month: "Nov", avgTemp: 74, bookingRate: 88, cancellations: 1 },
    { month: "Dec", avgTemp: 68, bookingRate: 92, cancellations: 0 },
  ],
  // Add data for other properties...
}

export function SeasonalAnalysis() {
  const [selectedProperty, setSelectedProperty] = useState("Portfolio Overview")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seasonal Analysis</CardTitle>
        <CardDescription>
          Track seasonal patterns and weather impacts on your Florida beach vacation rentals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger>
              <SelectValue>{selectedProperty}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Portfolio Overview">Portfolio Overview</SelectItem>
              <SelectItem value="Destin Beachfront">Destin Beachfront</SelectItem>
              <SelectItem value="Panama City Condo">Panama City Condo</SelectItem>
              <SelectItem value="Clearwater Villa">Clearwater Villa</SelectItem>
              <SelectItem value="Siesta Key Cottage">Siesta Key Cottage</SelectItem>
              <SelectItem value="Naples Beachhouse">Naples Beachhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
                  color: RATE_COLOR,
                },
                occupancy: {
                  label: "Occupancy Rate (%)",
                  color: OCCUPANCY_COLOR,
                },
                revenue: {
                  label: "Average Monthly Revenue ($)",
                  color: REVENUE_COLOR,
                },
              }}
            >
              <LineChart
                data={propertySeasonalData[selectedProperty as keyof typeof propertySeasonalData]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                height={350}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="avgRate"
                  stroke={RATE_COLOR}
                  strokeWidth={2}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="occupancy"
                  stroke={OCCUPANCY_COLOR}
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke={REVENUE_COLOR}
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="weather">
            <ChartContainer
              config={{
                avgTemp: {
                  label: "Average Temperature (°F)",
                  color: TEMP_COLOR,
                },
                bookingRate: {
                  label: "Booking Rate (%)",
                  color: BOOKING_COLOR,
                },
                cancellations: {
                  label: "Cancellations",
                  color: CANCEL_COLOR,
                },
              }}
            >
              <AreaChart
                data={propertyWeatherData[selectedProperty as keyof typeof propertyWeatherData]}
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
                  dataKey="avgTemp"
                  stroke={TEMP_COLOR}
                  fill={TEMP_COLOR}
                  fillOpacity={0.3}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="bookingRate"
                  stroke={BOOKING_COLOR}
                  fill={BOOKING_COLOR}
                  fillOpacity={0.3}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="cancellations"
                  stroke={CANCEL_COLOR}
                  fill={CANCEL_COLOR}
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
