"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, XAxis, YAxis } from "recharts"

const propertyList = [
  {
    name: "Destin Beachfront",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 10,
    avgNightly: "$395",
    occupancy: "92%",
    revenue: "$93,500",
    status: "Active",
  },
  {
    name: "Panama City Condo",
    type: "Condo",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    avgNightly: "$275",
    occupancy: "88%",
    revenue: "$74,250",
    status: "Active",
  },
  {
    name: "Clearwater Villa",
    type: "Villa",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    avgNightly: "$225",
    occupancy: "85%",
    revenue: "$63,900",
    status: "Active",
  },
  {
    name: "Siesta Key Cottage",
    type: "Cottage",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    avgNightly: "$195",
    occupancy: "82%",
    revenue: "$62,400",
    status: "Active",
  },
  {
    name: "Naples Beachhouse",
    type: "House",
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 12,
    avgNightly: "$450",
    occupancy: "90%",
    revenue: "$89,000",
    status: "Active",
  },
  {
    name: "St. Augustine Condo",
    type: "Condo",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    avgNightly: "$215",
    occupancy: "84%",
    revenue: "$58,500",
    status: "Active",
  },
  {
    name: "Key West Bungalow",
    type: "Bungalow",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    avgNightly: "$325",
    occupancy: "86%",
    revenue: "$72,800",
    status: "Maintenance",
  },
]

const propertyTypeData = [
  { name: "House", value: 2 },
  { name: "Condo", value: 2 },
  { name: "Villa", value: 1 },
  { name: "Cottage", value: 1 },
  { name: "Bungalow", value: 1 },
]

const bedroomDistributionData = [
  { bedrooms: "2 BR", count: 3 },
  { bedrooms: "3 BR", count: 2 },
  { bedrooms: "4 BR", count: 1 },
  { bedrooms: "5 BR", count: 1 },
]

const BLUE_SHADES = [
  "hsl(221 83% 53%)",  // Base blue
  "hsl(221 83% 65%)",  // Lighter blue
  "hsl(221 83% 45%)",  // Darker blue
  "hsl(221 83% 75%)",  // Very light blue
  "hsl(221 83% 35%)",  // Very dark blue
]

export function PropertyDetails() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Portfolio</CardTitle>
        <CardDescription>Overview of your Florida beach vacation rental properties</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="list">
          <TabsList className="mb-4">
            <TabsTrigger value="list">Property List</TabsTrigger>
            <TabsTrigger value="analysis">Portfolio Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Bedrooms</TableHead>
                    <TableHead>Bathrooms</TableHead>
                    <TableHead>Max Guests</TableHead>
                    <TableHead>Avg. Nightly</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyList.map((property) => (
                    <TableRow key={property.name}>
                      <TableCell className="font-medium">{property.name}</TableCell>
                      <TableCell>{property.type}</TableCell>
                      <TableCell>{property.bedrooms}</TableCell>
                      <TableCell>{property.bathrooms}</TableCell>
                      <TableCell>{property.maxGuests}</TableCell>
                      <TableCell>{property.avgNightly}</TableCell>
                      <TableCell>{property.occupancy}</TableCell>
                      <TableCell>{property.revenue}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            property.status === "Active"
                              ? "default"
                              : property.status === "Maintenance"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {property.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="analysis">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Property Types</h3>
                <ChartContainer
                  config={{
                    value: {
                      label: "Property Types",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <PieChart width={300} height={300}>
                    <Pie
                      data={propertyTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="hsl(var(--chart-1))"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {propertyTypeData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={BLUE_SHADES[index % BLUE_SHADES.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Bedroom Distribution</h3>
                <ChartContainer
                  config={{
                    count: {
                      label: "Number of Properties",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <BarChart
                    data={bedroomDistributionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    height={300}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bedrooms" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
