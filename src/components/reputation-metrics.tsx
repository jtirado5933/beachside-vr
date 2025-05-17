"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Color constants for the charts
const SCORE_COLOR = "#1e40af" // Deep blue for scores
const REVIEWS_COLOR = "#60a5fa" // Lighter blue for reviews
const SCORE_FILL = "#1e40af33" // Semi-transparent deep blue for area fills
const REVIEWS_FILL = "#60a5fa33" // Semi-transparent light blue for area fills

// Sample reputation data
const propertyScores = [
  { name: "Destin Beachfront", currentScore: 9.2, reviews: 187, yearlyAvg: 9.0 },
  { name: "Panama City Condo", currentScore: 8.8, reviews: 165, yearlyAvg: 8.7 },
  { name: "Clearwater Villa", currentScore: 8.5, reviews: 142, yearlyAvg: 8.6 },
  { name: "Siesta Key Cottage", currentScore: 8.9, reviews: 156, yearlyAvg: 8.8 },
  { name: "Naples Beachhouse", currentScore: 9.4, reviews: 178, yearlyAvg: 9.2 },
]

const monthlyScores = {
  "Destin Beachfront": [
    { month: "Jan", score: 9.1, reviews: 15 },
    { month: "Feb", score: 9.2, reviews: 18 },
    { month: "Mar", score: 9.3, reviews: 22 },
    { month: "Apr", score: 9.2, reviews: 16 },
    { month: "May", score: 9.0, reviews: 14 },
    { month: "Jun", score: 9.1, reviews: 17 },
    { month: "Jul", score: 9.3, reviews: 20 },
    { month: "Aug", score: 9.2, reviews: 19 },
    { month: "Sep", score: 9.1, reviews: 12 },
    { month: "Oct", score: 9.2, reviews: 14 },
    { month: "Nov", score: 9.3, reviews: 16 },
    { month: "Dec", score: 9.4, reviews: 24 },
  ],
  "Panama City Condo": [
    { month: "Jan", score: 8.7, reviews: 12 },
    { month: "Feb", score: 8.8, reviews: 15 },
    { month: "Mar", score: 8.9, reviews: 18 },
    { month: "Apr", score: 8.8, reviews: 14 },
    { month: "May", score: 8.7, reviews: 13 },
    { month: "Jun", score: 8.8, reviews: 16 },
    { month: "Jul", score: 8.9, reviews: 17 },
    { month: "Aug", score: 8.8, reviews: 15 },
    { month: "Sep", score: 8.7, reviews: 11 },
    { month: "Oct", score: 8.8, reviews: 12 },
    { month: "Nov", score: 8.9, reviews: 14 },
    { month: "Dec", score: 9.0, reviews: 18 },
  ],
  // Add similar data for other properties...
}

const yearlyScores = {
  "Destin Beachfront": [
    { year: "2020", score: 8.8, reviews: 156 },
    { year: "2021", score: 9.0, reviews: 168 },
    { year: "2022", score: 9.1, reviews: 175 },
    { year: "2023", score: 9.2, reviews: 187 },
  ],
  "Panama City Condo": [
    { year: "2020", score: 8.5, reviews: 142 },
    { year: "2021", score: 8.6, reviews: 150 },
    { year: "2022", score: 8.7, reviews: 158 },
    { year: "2023", score: 8.8, reviews: 165 },
  ],
  // Add similar data for other properties...
}

export function ReputationMetrics() {
  const [selectedProperty, setSelectedProperty] = useState("Portfolio Overview")
  const portfolioAvgScore = (propertyScores.reduce((sum, prop) => sum + prop.currentScore, 0) / propertyScores.length).toFixed(1)
  const totalReviews = propertyScores.reduce((sum, prop) => sum + prop.reviews, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reputation Metrics</CardTitle>
        <CardDescription>Track guest satisfaction and property ratings over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger>
              <SelectValue>{selectedProperty}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Portfolio Overview">Portfolio Overview</SelectItem>
              {propertyScores.map((property) => (
                <SelectItem key={property.name} value={property.name}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedProperty === "Portfolio Overview" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{portfolioAvgScore}</CardTitle>
                  <CardDescription>Average Portfolio Score</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{totalReviews}</CardTitle>
                  <CardDescription>Total Reviews</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <ChartContainer
              config={{
                score: {
                  label: "Score",
                  color: SCORE_COLOR,
                },
                reviews: {
                  label: "Reviews",
                  color: REVIEWS_COLOR,
                },
              }}
            >
              <BarChart data={propertyScores} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} height={300}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" domain={[0, 10]} />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar yAxisId="left" dataKey="currentScore" name="Current Score" fill={SCORE_COLOR} radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="reviews" name="Reviews" fill={REVIEWS_COLOR} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        ) : (
          <Tabs defaultValue="monthly">
            <TabsList className="mb-4">
              <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
              <TabsTrigger value="yearly">Yearly Trends</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly">
              <ChartContainer
                config={{
                  score: {
                    label: "Score",
                    color: SCORE_COLOR,
                  },
                  reviews: {
                    label: "Reviews",
                    color: REVIEWS_COLOR,
                  },
                }}
              >
                <AreaChart
                  data={monthlyScores[selectedProperty as keyof typeof monthlyScores]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  height={300}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" domain={[0, 10]} />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="score"
                    stroke={SCORE_COLOR}
                    fill={SCORE_FILL}
                    fillOpacity={0.3}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="reviews"
                    stroke={REVIEWS_COLOR}
                    fill={REVIEWS_FILL}
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="yearly">
              <ChartContainer
                config={{
                  score: {
                    label: "Score",
                    color: SCORE_COLOR,
                  },
                  reviews: {
                    label: "Reviews",
                    color: REVIEWS_COLOR,
                  },
                }}
              >
                <AreaChart
                  data={yearlyScores[selectedProperty as keyof typeof yearlyScores]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  height={300}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" domain={[0, 10]} />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="score"
                    stroke={SCORE_COLOR}
                    fill={SCORE_FILL}
                    fillOpacity={0.3}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="reviews"
                    stroke={REVIEWS_COLOR}
                    fill={REVIEWS_FILL}
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
} 