"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Color constants for the charts
const SAME_DAY_COLOR = "#1e40af" // Deep blue for same day
const ONE_DAY_COLOR = "#3b82f6" // Medium blue for one day
const MULTI_DAY_COLOR = "#60a5fa" // Light blue for multi day

// Property-specific scheduling data
const propertySchedulingData = {
  "Portfolio Overview": [
    {
      property: "Destin Beachfront",
      checkout: "May 15, 2025",
      cleaning: "May 15, 2025 (2:00 PM)",
      checkin: "May 16, 2025 (4:00 PM)",
      status: "On Schedule",
      cleaningTeam: "Team A",
    },
    {
      property: "Panama City Condo",
      checkout: "May 17, 2025",
      cleaning: "May 17, 2025 (1:00 PM)",
      checkin: "May 18, 2025 (3:00 PM)",
      status: "On Schedule",
      cleaningTeam: "Team B",
    },
    {
      property: "Clearwater Villa",
      checkout: "May 14, 2025",
      cleaning: "May 14, 2025 (12:00 PM)",
      checkin: "May 15, 2025 (4:00 PM)",
      status: "Completed",
      cleaningTeam: "Team C",
    },
    {
      property: "Siesta Key Cottage",
      checkout: "May 20, 2025",
      cleaning: "May 20, 2025 (1:30 PM)",
      checkin: "May 21, 2025 (4:00 PM)",
      status: "Pending",
      cleaningTeam: "Team A",
    },
    {
      property: "Naples Beachhouse",
      checkout: "May 18, 2025",
      cleaning: "May 18, 2025 (2:00 PM)",
      checkin: "May 19, 2025 (4:00 PM)",
      status: "At Risk",
      cleaningTeam: "Team D",
    },
  ],
  "Destin Beachfront": [
    {
      property: "Destin Beachfront",
      checkout: "May 15, 2025",
      cleaning: "May 15, 2025 (2:00 PM)",
      checkin: "May 16, 2025 (4:00 PM)",
      status: "On Schedule",
      cleaningTeam: "Team A",
    },
  ],
  // Add data for other properties...
}

// Property-specific turnaround time data
const propertyTurnaroundData = {
  "Portfolio Overview": [
    { property: "Destin Beachfront", sameDay: 12, oneDay: 45, multiDay: 5 },
    { property: "Panama City Condo", sameDay: 18, oneDay: 38, multiDay: 3 },
    { property: "Clearwater Villa", sameDay: 22, oneDay: 32, multiDay: 2 },
    { property: "Siesta Key Cottage", sameDay: 15, oneDay: 40, multiDay: 4 },
    { property: "Naples Beachhouse", sameDay: 10, oneDay: 48, multiDay: 6 },
  ],
  "Destin Beachfront": [
    { property: "Destin Beachfront", sameDay: 12, oneDay: 45, multiDay: 5 },
  ],
  // Add data for other properties...
}

export function SchedulingMetrics() {
  const [selectedProperty, setSelectedProperty] = useState("Portfolio Overview")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Beach Vacation Scheduling</CardTitle>
        <CardDescription>
          Track upcoming turnovers and scheduling efficiency for your Florida beach rentals
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
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming Turnovers</TabsTrigger>
            <TabsTrigger value="turnaround">Turnaround Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Checkout</TableHead>
                    <TableHead>Cleaning</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertySchedulingData[selectedProperty as keyof typeof propertySchedulingData].map((item) => (
                    <TableRow key={item.property}>
                      <TableCell className="font-medium">{item.property}</TableCell>
                      <TableCell>{item.checkout}</TableCell>
                      <TableCell>{item.cleaning}</TableCell>
                      <TableCell>{item.checkin}</TableCell>
                      <TableCell>{item.cleaningTeam}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === "Completed"
                              ? "outline"
                              : item.status === "At Risk"
                                ? "destructive"
                                : item.status === "On Schedule"
                                  ? "default"
                                  : "secondary"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="turnaround">
            <ChartContainer
              config={{
                sameDay: {
                  label: "Same Day Turnovers",
                  color: SAME_DAY_COLOR,
                },
                oneDay: {
                  label: "One Day Gap",
                  color: ONE_DAY_COLOR,
                },
                multiDay: {
                  label: "Multiple Day Gap",
                  color: MULTI_DAY_COLOR,
                },
              }}
            >
              <BarChart
                data={propertyTurnaroundData[selectedProperty as keyof typeof propertyTurnaroundData]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                height={350}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="property" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar
                  dataKey="sameDay"
                  stackId="a"
                  fill={SAME_DAY_COLOR}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="oneDay"
                  stackId="a"
                  fill={ONE_DAY_COLOR}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="multiDay"
                  stackId="a"
                  fill={MULTI_DAY_COLOR}
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
