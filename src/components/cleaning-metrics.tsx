"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts"

const cleaningTimeData = [
  { property: "Destin Beachfront", avgTime: 3.8, targetTime: 3.5, staffAssigned: 2 },
  { property: "Panama City Condo", avgTime: 3.2, targetTime: 3.0, staffAssigned: 2 },
  { property: "Clearwater Villa", avgTime: 2.5, targetTime: 2.5, staffAssigned: 1 },
  { property: "Siesta Key Cottage", avgTime: 2.9, targetTime: 3.0, staffAssigned: 1 },
  { property: "Naples Beachhouse", avgTime: 4.2, targetTime: 4.0, staffAssigned: 3 },
]

const cleaningTrendData = [
  { month: "Jan", avgTime: 3.7, issues: 6, satisfaction: 92 },
  { month: "Feb", avgTime: 3.6, issues: 5, satisfaction: 93 },
  { month: "Mar", avgTime: 3.5, issues: 7, satisfaction: 91 },
  { month: "Apr", avgTime: 3.4, issues: 4, satisfaction: 94 },
  { month: "May", avgTime: 3.3, issues: 3, satisfaction: 95 },
  { month: "Jun", avgTime: 3.2, issues: 5, satisfaction: 93 },
  { month: "Jul", avgTime: 3.1, issues: 4, satisfaction: 94 },
  { month: "Aug", avgTime: 3.0, issues: 6, satisfaction: 92 },
  { month: "Sep", avgTime: 2.9, issues: 3, satisfaction: 95 },
  { month: "Oct", avgTime: 2.8, issues: 2, satisfaction: 96 },
  { month: "Nov", avgTime: 2.7, issues: 1, satisfaction: 97 },
  { month: "Dec", avgTime: 2.8, issues: 3, satisfaction: 95 },
]

const cleaningIssuesData = [
  { issue: "Sand Removal", count: 42, percentOfTotal: 28 },
  { issue: "Bathroom Cleaning", count: 35, percentOfTotal: 23 },
  { issue: "Linens/Bedding", count: 28, percentOfTotal: 19 },
  { issue: "Kitchen Cleaning", count: 22, percentOfTotal: 15 },
  { issue: "Outdoor Areas", count: 15, percentOfTotal: 10 },
  { issue: "Other", count: 8, percentOfTotal: 5 },
]

export function CleaningMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Beach Property Cleaning Metrics</CardTitle>
        <CardDescription>
          Track cleaning performance and turnover times for your Florida vacation rentals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="turnover">
          <TabsList className="mb-4">
            <TabsTrigger value="turnover">Turnover Times</TabsTrigger>
            <TabsTrigger value="trends">Cleaning Trends</TabsTrigger>
            <TabsTrigger value="issues">Common Issues</TabsTrigger>
          </TabsList>
          <TabsContent value="turnover" className="space-y-4">
            <ChartContainer
              config={{
                avgTime: {
                  label: "Average Time (hours)",
                  color: "hsl(var(--chart-1))",
                },
                targetTime: {
                  label: "Target Time (hours)",
                  color: "hsl(var(--chart-2))",
                },
                staffAssigned: {
                  label: "Staff Assigned",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <BarChart data={cleaningTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} height={350}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="property" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="avgTime" fill="var(--color-avgTime)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="targetTime" fill="var(--color-targetTime)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="staffAssigned" fill="var(--color-staffAssigned)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="trends">
            <ChartContainer
              config={{
                avgTime: {
                  label: "Average Time (hours)",
                  color: "hsl(var(--chart-1))",
                },
                issues: {
                  label: "Cleaning Issues",
                  color: "hsl(var(--chart-2))",
                },
                satisfaction: {
                  label: "Guest Satisfaction (%)",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <LineChart data={cleaningTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} height={350}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="avgTime" stroke="var(--color-avgTime)" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="issues" stroke="var(--color-issues)" strokeWidth={2} />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="var(--color-satisfaction)"
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="issues">
            <ChartContainer
              config={{
                count: {
                  label: "Number of Occurrences",
                  color: "hsl(var(--chart-1))",
                },
                percentOfTotal: {
                  label: "Percent of Total Issues (%)",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <BarChart data={cleaningIssuesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} height={350}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="issue" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar yAxisId="left" dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                <Bar
                  yAxisId="right"
                  dataKey="percentOfTotal"
                  fill="var(--color-percentOfTotal)"
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
