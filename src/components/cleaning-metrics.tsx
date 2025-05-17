"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Color constants for the charts
const ACTUAL_TIME_COLOR = "#1e40af" // Deep blue for actual cleaning time
const TARGET_TIME_COLOR = "#3b82f6" // Medium blue for target time
const STAFF_COLOR = "#60a5fa" // Light blue for staff assigned
const ISSUES_COLOR = "#2563eb" // Royal blue for issues
const SATISFACTION_COLOR = "#1d4ed8" // Strong blue for satisfaction
const COUNT_COLOR = "#1e40af" // Deep blue for issue counts
const PERCENT_COLOR = "#60a5fa" // Light blue for percentages

const propertyCleaningTrends = {
  "Destin Beachfront": [
    { month: "Jan", avgTime: 4.0, issues: 2, satisfaction: 90 },
    { month: "Feb", avgTime: 3.9, issues: 1, satisfaction: 92 },
    { month: "Mar", avgTime: 3.8, issues: 2, satisfaction: 91 },
    { month: "Apr", avgTime: 3.7, issues: 1, satisfaction: 93 },
    { month: "May", avgTime: 3.6, issues: 0, satisfaction: 95 },
    { month: "Jun", avgTime: 3.5, issues: 1, satisfaction: 94 },
    { month: "Jul", avgTime: 3.4, issues: 1, satisfaction: 94 },
    { month: "Aug", avgTime: 3.3, issues: 2, satisfaction: 92 },
    { month: "Sep", avgTime: 3.2, issues: 1, satisfaction: 93 },
    { month: "Oct", avgTime: 3.1, issues: 0, satisfaction: 95 },
    { month: "Nov", avgTime: 3.0, issues: 0, satisfaction: 96 },
    { month: "Dec", avgTime: 3.1, issues: 1, satisfaction: 94 },
  ],
  "Panama City Condo": [
    { month: "Jan", avgTime: 3.5, issues: 1, satisfaction: 93 },
    { month: "Feb", avgTime: 3.4, issues: 1, satisfaction: 93 },
    { month: "Mar", avgTime: 3.3, issues: 2, satisfaction: 91 },
    { month: "Apr", avgTime: 3.2, issues: 1, satisfaction: 94 },
    { month: "May", avgTime: 3.1, issues: 1, satisfaction: 94 },
    { month: "Jun", avgTime: 3.0, issues: 1, satisfaction: 93 },
    { month: "Jul", avgTime: 2.9, issues: 1, satisfaction: 94 },
    { month: "Aug", avgTime: 2.8, issues: 1, satisfaction: 93 },
    { month: "Sep", avgTime: 2.7, issues: 0, satisfaction: 96 },
    { month: "Oct", avgTime: 2.6, issues: 0, satisfaction: 97 },
    { month: "Nov", avgTime: 2.5, issues: 0, satisfaction: 98 },
    { month: "Dec", avgTime: 2.6, issues: 1, satisfaction: 95 },
  ],
  "Portfolio Overview": [
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
  ],
}

const cleaningTimeData = [
  { property: "Destin Beachfront", avgTime: 3.8, targetTime: 3.5, staffAssigned: 2 },
  { property: "Panama City Condo", avgTime: 3.2, targetTime: 3.0, staffAssigned: 2 },
  { property: "Clearwater Villa", avgTime: 2.5, targetTime: 2.5, staffAssigned: 1 },
  { property: "Siesta Key Cottage", avgTime: 2.9, targetTime: 3.0, staffAssigned: 1 },
  { property: "Naples Beachhouse", avgTime: 4.2, targetTime: 4.0, staffAssigned: 3 },
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
  const [selectedProperty, setSelectedProperty] = useState("Portfolio Overview")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Beach Property Cleaning Metrics</CardTitle>
        <CardDescription>
          Track cleaning performance and turnover times for your Florida vacation rentals
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
              {cleaningTimeData.map((property) => (
                <SelectItem key={property.property} value={property.property}>
                  {property.property}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
                  color: ACTUAL_TIME_COLOR,
                },
                targetTime: {
                  label: "Target Time (hours)",
                  color: TARGET_TIME_COLOR,
                },
                staffAssigned: {
                  label: "Staff Assigned",
                  color: STAFF_COLOR,
                },
              }}
            >
              <BarChart data={cleaningTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} height={350}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="property" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="avgTime" fill={ACTUAL_TIME_COLOR} radius={[4, 4, 0, 0]} />
                <Bar dataKey="targetTime" fill={TARGET_TIME_COLOR} radius={[4, 4, 0, 0]} />
                <Bar dataKey="staffAssigned" fill={STAFF_COLOR} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="trends">
            <ChartContainer
              config={{
                avgTime: {
                  label: "Average Time (hours)",
                  color: ACTUAL_TIME_COLOR,
                },
                issues: {
                  label: "Cleaning Issues",
                  color: ISSUES_COLOR,
                },
                satisfaction: {
                  label: "Guest Satisfaction (%)",
                  color: SATISFACTION_COLOR,
                },
              }}
            >
              <LineChart 
                data={propertyCleaningTrends[selectedProperty as keyof typeof propertyCleaningTrends]} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }} 
                height={350}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="avgTime" stroke={ACTUAL_TIME_COLOR} strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="issues" stroke={ISSUES_COLOR} strokeWidth={2} />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="satisfaction"
                  stroke={SATISFACTION_COLOR}
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
                  color: COUNT_COLOR,
                },
                percentOfTotal: {
                  label: "Percent of Total Issues (%)",
                  color: PERCENT_COLOR,
                },
              }}
            >
              <BarChart data={cleaningIssuesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} height={350}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="issue" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar yAxisId="left" dataKey="count" fill={COUNT_COLOR} radius={[4, 4, 0, 0]} />
                <Bar
                  yAxisId="right"
                  dataKey="percentOfTotal"
                  fill={PERCENT_COLOR}
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
