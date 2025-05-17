"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"

const schedulingData = [
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
  {
    property: "St. Augustine Condo",
    checkout: "May 16, 2025",
    cleaning: "May 16, 2025 (1:00 PM)",
    checkin: "May 17, 2025 (3:00 PM)",
    status: "On Schedule",
    cleaningTeam: "Team B",
  },
  {
    property: "Key West Bungalow",
    checkout: "May 19, 2025",
    cleaning: "May 19, 2025 (12:30 PM)",
    checkin: "May 20, 2025 (4:00 PM)",
    status: "Pending",
    cleaningTeam: "Team C",
  },
]

const turnaroundTimeData = [
  { property: "Destin Beachfront", sameDay: 12, oneDay: 45, multiDay: 5 },
  { property: "Panama City Condo", sameDay: 18, oneDay: 38, multiDay: 3 },
  { property: "Clearwater Villa", sameDay: 22, oneDay: 32, multiDay: 2 },
  { property: "Siesta Key Cottage", sameDay: 15, oneDay: 40, multiDay: 4 },
  { property: "Naples Beachhouse", sameDay: 10, oneDay: 48, multiDay: 6 },
]

export function SchedulingMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Beach Vacation Scheduling</CardTitle>
        <CardDescription>
          Track upcoming turnovers and scheduling efficiency for your Florida beach rentals
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                  {schedulingData.map((item) => (
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
                  color: "hsl(var(--chart-1))",
                },
                oneDay: {
                  label: "One Day Gap",
                  color: "hsl(var(--chart-2))",
                },
                multiDay: {
                  label: "Multiple Day Gap",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <BarChart data={turnaroundTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} height={350}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="property" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="sameDay" stackId="a" fill="var(--color-sameDay)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="oneDay" stackId="a" fill="var(--color-oneDay)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="multiDay" stackId="a" fill="var(--color-multiDay)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
